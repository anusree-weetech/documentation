import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { createHash } from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  async register(data: any) {
    const existing = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existing) return { message: 'User already exists' };

    const user = this.userRepo.create({
      email: data.email,
      password: this.hashPassword(data.password),
    });

    await this.userRepo.save(user);
    this.eventEmitter.emit('user.created', { id: user.id, email: user.email });

    return { message: 'User registered successfully', user };
  }

  async login(data: any) {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user || user.password !== this.hashPassword(data.password)) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }
}
