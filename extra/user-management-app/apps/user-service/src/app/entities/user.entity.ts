import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

@Entity('users') // Table name in auth DB
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  @Column({ nullable: true })
  phone?: string;
  
  @Column({ nullable: true })
  address?: string;
}
