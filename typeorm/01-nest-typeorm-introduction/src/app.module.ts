import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { BankingnestService } from './g/bankingnest/bankingnest.service';
import { BankingService } from './banking/banking.service';
import { BankingController } from './banking/banking.controller';
import { BankingModule } from './banking/banking.module';
import AppDataSource from './data-source';
import { typeormConfig } from './typeorm.config';

// console.log(AppDataSource.options)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'users_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    BankingModule,
  ],
  controllers: [AppController, BankingController],
  providers: [AppService, BankingService],
})
export class AppModule {}
