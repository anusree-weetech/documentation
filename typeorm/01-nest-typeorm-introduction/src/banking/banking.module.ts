import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './banking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Account, Transaction])],
  providers: [BankingService],
  controllers: [BankingController],
  exports: [TypeOrmModule], 
})
export class BankingModule {}
