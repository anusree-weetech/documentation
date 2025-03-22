import { Session as _session } from 'express-session';
import { AuthCredentialDto } from '../../common/dtos/auth-credential.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: AuthCredentialDto, session: _session): Promise<import("../../database/entities/user.entity").User>;
    signin(body: AuthCredentialDto, session: _session): Promise<import("../../database/entities/user.entity").User>;
    logout(session: _session): {
        message: string;
    };
}
