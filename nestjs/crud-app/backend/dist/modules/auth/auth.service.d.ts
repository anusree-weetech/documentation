import { UsersService } from '../users/users.service';
export declare class AuthService {
    private userService;
    private saltRounds;
    constructor(userService: UsersService);
    signup(email: string, password: string): Promise<import("../../database/entities/user.entity").User>;
    signin(email: string, password: string): Promise<import("../../database/entities/user.entity").User>;
}
