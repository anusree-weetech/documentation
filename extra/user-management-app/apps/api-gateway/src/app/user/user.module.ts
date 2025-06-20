import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class UserModule {}
