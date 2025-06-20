import {
  Controller,
  Post,
  Body,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await firstValueFrom(this.authClient.send('register', data));
  }

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { message, accessToken, statusCode } = await firstValueFrom(
      this.authClient.send('login', data)
    );

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return { message, statusCode };
  }
}
