import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(name: string, email: string, password: string) {
    const user = await this.userRepository.find({ where: { email } });
    if (user.length !== 0) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.find({ where: { email } });
    if (user.length === 0) {
      throw new NotFoundException('Invalid credentials');
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    if (user[0].password !== hashedPassword) {
      throw new NotFoundException('Invalid credentials');
    }

    return user;
  }
}
