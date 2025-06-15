import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule], //register post repository with post entity, make repo availabel in this module
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
