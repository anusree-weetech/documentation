import { ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(()=>Accout)
  fromAccount: Account;
  toAccount: Account;
  amount: number;
  date: Date;
}
