import { Controller, Delete, Get, Session, UseGuards } from '@nestjs/common';
import { Session as _Session } from 'express-session';
import { UsersService } from './users.service';
import { SessionGuard } from 'src/guards/session.guard';

@Controller('users')
@UseGuards(SessionGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Delete()
  DeleteUser(@Session() session: _Session) {
    return this.userService.deleteUser(session.user.id);
  }

}
