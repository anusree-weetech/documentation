import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // register User repository
  providers: [UsersService],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}
