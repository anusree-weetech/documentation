import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BankingService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async transferFunds(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ) {
    const fromAccount = await this.getAccountOrThrow(fromAccountId);
    const toAccount = await this.getAccountOrThrow(toAccountId);

    this.ensureSufficientFunds(fromAccount, amount);

    this.updateBalances(fromAccount, toAccount, amount);

    await this.saveAccounts(fromAccount, toAccount);

    return { fromAccount, toAccount };
  }

  private async getAccountOrThrow(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new NotFoundException(`Account not found: ${accountId}`);
    }
    return account;
  }

  private ensureSufficientFunds(account: Account, amount: number): void {
    if (account.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }
  }

  private updateBalances(
    fromAccount: Account,
    toAccount: Account,
    amount: number,
  ): void {
    fromAccount.balance -= amount;
    toAccount.balance += amount;
  }

  private async saveAccounts(
    fromAccount: Account,
    toAccount: Account,
  ): Promise<void> {
    await this.accountRepository.save(fromAccount);
    await this.accountRepository.save(toAccount);
  }

  async createAccount(name: string, initialBalance: number): Promise<Account> {
    const account = this.accountRepository.create({
      accountHolderName: name,
      balance: initialBalance,
    });
    return await this.accountRepository.save(account);
  }
}
