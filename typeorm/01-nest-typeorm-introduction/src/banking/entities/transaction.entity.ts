import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('transactions') 
export class Transaction{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToMany(() => Account)
  fromAccount: Account;
  @ManyToMany(() => Account)
  toAccount: Account;
  @Column()
  date: Date;
  @Column()
  amount: number;
}
