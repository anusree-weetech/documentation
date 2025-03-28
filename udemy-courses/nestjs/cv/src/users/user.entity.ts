import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with ID: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with ID: ${this.id}`);
  }

  @BeforeRemove()
  logRemove() {
    console.log(`Removed User with ID: ${this.id}`);
  }
}
