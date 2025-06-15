import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any) {
    await this.userService.createUserFromEvent(data);
  }
}
