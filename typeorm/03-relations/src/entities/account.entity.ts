import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  accountHolder: string;
  @Column()
  balance: number;
  @OneToMany(() => Transaction, (transaction) => transaction.fromAccount)
  transactions: Transaction[];
}
