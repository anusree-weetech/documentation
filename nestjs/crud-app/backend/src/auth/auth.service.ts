import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private saltRounds: number = 10;
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const hashedpassword = await bcrypt.hash(password, this.saltRounds);
    return this.userService.createUser(email, hashedpassword);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findUser(email);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
