import {
  Body,
  Controller,
  Inject,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto } from './dtos/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Request() req, @Body() userDetails: UpdateUserDto) {
    const email = req.user.email;

    userDetails.email = email;

    return await firstValueFrom(
      this.userClient.send('user.updated', userDetails)
    );
  }
}
