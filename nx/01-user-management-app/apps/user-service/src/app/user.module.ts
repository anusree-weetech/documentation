import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.USER_DB_HOST || 'localhost',
      port: Number(process.env.USER_DB_PORT) || 5432,
      username: process.env.USER_DB_USERNAME || 'postgres',
      password: process.env.USER_DB_PASSWORD || 'postgres',
      database: process.env.USER_DB_NAME || 'user_db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
