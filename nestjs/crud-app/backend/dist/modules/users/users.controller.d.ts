import { Session as _Session } from 'express-session';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    DeleteUser(session: _Session): Promise<{
        message: string;
    }>;
}
