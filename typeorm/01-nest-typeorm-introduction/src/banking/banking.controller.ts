import { Controller, Post, Body } from '@nestjs/common';
import { BankingService } from './banking.service';
import { TransferDto } from './dtos/transfer.dto';

@Controller('banking')
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @Post('create-account')
  async createAccount(@Body() body: { name: string; initialBalance: number }) {
    return await this.bankingService.createAccount(
      body.name,
      body.initialBalance,
    );
  }

  @Post('transfer')
  async transferFunds(@Body() body: TransferDto) {
    const { fromAccountId, toAccountId, amount } = body;
    return await this.bankingService.transferFunds(
      fromAccountId,
      toAccountId,
      amount,
    );
  }
}
