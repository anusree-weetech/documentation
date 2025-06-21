import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  async register(data: RegisterDto) {
    return this.authService.register(data);
  }

  @MessagePattern('login')
  async login(data: LoginDto) {
    return this.authService.login(data);
  }
}
