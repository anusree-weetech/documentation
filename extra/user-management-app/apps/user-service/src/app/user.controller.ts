import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserEventDto } from './dtos/create-user-event.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: CreateUserEventDto) {
    await this.userService.createUserFromEvent(data);
  }

  @EventPattern('user.updated')
  async handleUserUpdated(@Payload() data: UpdateUserDto) {
    return await this.userService.updateUser(data);
  }
}
