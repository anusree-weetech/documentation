import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BankingnestService } from './g/bankingnest/bankingnest.service';
import { BankingService } from './banking/banking.service';
import { BankingController } from './banking/banking.controller';
import { BankingModule } from './banking/banking.module';

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
      synchronize: false, // autosync disabled
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true, // Optional: run migrations automatically on app start
    }),
    UsersModule,
    BankingModule,
  ],
  controllers: [AppController, BankingController],
  providers: [AppService, BankingnestService, BankingService],
})
export class AppModule {}
