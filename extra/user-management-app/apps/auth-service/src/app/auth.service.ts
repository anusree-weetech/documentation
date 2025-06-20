import {
  ConflictException,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  async register(data: RegisterDto) {
    const existing = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existing) throw new ConflictException('User already exists');

    const user = this.userRepo.create({
      ...data,
      password: this.hashPassword(data.password),
    });

    await this.userRepo.save(user);
    await firstValueFrom(this.userClient.emit('user.created', user));

    return {
      message: 'User registered successfully',
      user: instanceToPlain(user),
      statusCode: HttpStatus.CREATED,
    };
  }

  async login(data: any) {
    console.log('login data:', data);
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (!user || user.password !== this.hashPassword(data.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user,
      accessToken: token,
      statusCode: HttpStatus.OK,
    };
  }
}
