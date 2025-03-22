import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from 'src/dtos/auth-credential.dto';
import { Session as _session } from 'express-session';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: AuthCredentialDto, @Session() session: _session) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.user = { email: user.email, id: user.id };

    return user;
  }

  @Post('signin')
  async signin(@Body() body: AuthCredentialDto, @Session() session: _session) {
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.user = { email: user.email, id: user.id };
    return user;
  }

  @Post('logout')
  logout(@Session() session: _session) {
    if (!session.user) {
      return { message: 'No active session found' };
    }

    if (session) {
      session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
      });
    }

    return { message: 'Logged out successfully' };
  }
}
