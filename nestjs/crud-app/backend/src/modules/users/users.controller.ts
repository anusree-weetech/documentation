import { Controller, Delete, Session, UseGuards } from '@nestjs/common';
import { Session as _Session } from 'express-session';
import { ApiDocs } from 'src/common/decorators/docs.decorator';
import { SessionGuard } from 'src/common/guards/session.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(SessionGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiDocs({
    summary: 'Delete current user',
    successStatus: 200,
    successExample: {
      message: { type: 'string', example: 'Deleted user with ID: 123' },
    },
    errorResponses: [{ status: 404, message: 'User not found' }],
  })
  @Delete()
  DeleteUser(@Session() session: _Session) {
    return this.userService.deleteUser(session.user.id);
  }
}
