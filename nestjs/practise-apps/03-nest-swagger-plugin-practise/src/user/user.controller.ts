import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { DeleteUserResponseDto } from './dto/delete-user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto): UserResponseDto {
    return this.userService.create(dto);
  }

  @Get()
  findAll(): UserResponseDto[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserResponseDto | undefined {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): UserResponseDto | null {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): DeleteUserResponseDto {
    return this.userService.remove(+id);
  }
}
