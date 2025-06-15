import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  @Post('register')
  register(@Body() data: any) {
    return this.authClient.send({ cmd: 'register' }, data);
  }

  @Post('login')
  login(@Body() data: any) {
    return this.authClient.send({ cmd: 'login' }, data);
  }
}