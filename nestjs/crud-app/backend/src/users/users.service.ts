import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }

  async findUser(email?: string, id?: number) {
    let user: User | null = null;
    if (email) {
      user = await this.userRepository.findOne({ where: { email } });
    } else if (id) {
      user = await this.userRepository.findOne({ where: { id } });
    }
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return { message: `Deleted user with ID: ${id}` };
  }
}
