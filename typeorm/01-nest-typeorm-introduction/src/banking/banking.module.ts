import { Module } from '@nestjs/common';
import { BankingController } from './banking.controller';
import { BankingService } from './banking.service';

@Module({
  providers: [BankingService],
  controllers: [BankingController],
})
export class BankingModule {}
