import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  accountHolder: string;
  @Column()
  balance: number;
  @OneToMany(()=>)
  transactions: Transaction[];
}
