import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { CreateUserEventDto } from './dtos/create-user-event.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async createUserFromEvent(data: CreateUserEventDto) {
    const existing = await this.userRepo.findOne({ where: { id: data.id } });
    if (existing) return;

    const user = this.userRepo.create(data); //same id and createdAt as auth service

    await this.userRepo.save(user);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: updateUserDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.name = updateUserDto.name || user.name;
    user.phone = updateUserDto.phone || user.phone;
    user.address = updateUserDto.address || user.address;

    const updateUser = await this.userRepo.save(user);
    return {
      message: 'User updated successfully',
      user: instanceToPlain(updateUser),
      statusCode: HttpStatus.OK,
    };
  }
}
