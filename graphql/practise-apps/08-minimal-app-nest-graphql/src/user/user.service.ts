import { Injectable } from '@nestjs/common';
import { User } from './user.model';

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  create(name: string, email: string): User {
    const newUser = { id: this.users.length + 1, name, email };
    this.users.push(newUser);
    return newUser;
  }
}
