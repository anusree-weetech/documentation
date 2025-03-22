import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DatabaseService } from './database.service';
import { Post } from 'src/entities/post.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const type = configService.get('DB_TYPE');
        const database = configService.get('DB_URL');

        return {
          type,
          database,
          entities: [User, Post], //registering entities in db to mae it available globally
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    // TypeOrmModule.forFeature([User]), // Makes the User repository available in the DatabaseModule. and i personally dont think thi is necesary
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
