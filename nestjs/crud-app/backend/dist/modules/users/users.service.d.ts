import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(email: string, password: string): Promise<User>;
    findUser(email?: string, id?: number): Promise<User>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
