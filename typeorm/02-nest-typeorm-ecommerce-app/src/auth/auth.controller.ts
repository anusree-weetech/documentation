import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  registerUser(@Body() body: RegisterUserDto) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }
}
