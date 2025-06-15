import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createAccount(name: string, balance: number) {
    return this.accountRepository.create({ accountHolder: name, balance });
  }

  async addAmount(toAccountId: string, amount: number) {
    const account = await this.accountRepository.findOne({
      where: { id: toAccountId },
    });
    if (!account)
      throw new NotFoundException(
        `Account with account id ${toAccountId} not found`,
      );
    const balance = account.balance + amount;
    return this.accountRepository.update(toAccountId, { balance });
  }
}
