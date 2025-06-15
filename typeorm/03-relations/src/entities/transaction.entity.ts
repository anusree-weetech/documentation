import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Account)
  fromAccount: Account;
  @ManyToOne(() => Account)
  toAccount: Account;
  @Column()
  amount: number;
  @Column()
  date: Date;
}
