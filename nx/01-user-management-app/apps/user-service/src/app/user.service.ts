import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUserFromEvent(data: any) {
    const existing = await this.userRepo.findOne({ where: { id: data.id } });
    if (existing) return;

    const user = this.userRepo.create({
      id: data.id, // Use same ID from auth-service
      email: data.email,
    });

    await this.userRepo.save(user);
  }
}
