import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'node:util';
import { scrypt as _scrypt, randomBytes } from 'node:crypto';

@Injectable() //means auth service can be injected/exported/used in into other classes
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) throw new BadRequestException('Email in use');

    const scrypt = promisify(_scrypt);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    return await this.userService.create(email, hashedPassword);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHash] = user.password.split('.');
    const scrypt = promisify(_scrypt);
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    
    return user;
  }
}
