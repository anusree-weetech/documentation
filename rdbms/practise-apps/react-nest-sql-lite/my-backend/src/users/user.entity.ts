import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // one column compulsory while starting a table
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
