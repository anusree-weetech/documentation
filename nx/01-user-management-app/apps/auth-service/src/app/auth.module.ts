import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

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
      synchronize: true, // 🚨 Set to false in production!
    }),
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4002 },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
