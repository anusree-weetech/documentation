import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  create(dto: CreateUserDto): User {
    const newUser = {
      id: this.idCounter++,
      ...dto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, dto: UpdateUserDto): User | null {
    const user = this.findOne(id);
    if (!user) return null;
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): { success: boolean } {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return { success: false };
    this.users.splice(index, 1);
    return { success: true };
  }
}
