import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AUTH_DB_HOST || 'localhost',
      port: Number(process.env.AUTH_DB_PORT) || 5432,
      username: process.env.AUTH_DB_USERNAME || 'postgres',
      password: process.env.AUTH_DB_PASSWORD || 'postgres',
      database: process.env.AUTH_DB_NAME || 'auth_db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),

    // Redis Client to emit events to User Service
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    EventEmitterModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
