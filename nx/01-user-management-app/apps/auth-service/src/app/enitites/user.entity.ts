import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Table name in auth DB
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
