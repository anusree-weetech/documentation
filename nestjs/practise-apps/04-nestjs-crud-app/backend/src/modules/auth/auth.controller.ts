import { Body, Controller, Post, Session } from '@nestjs/common';
import { Session as _session } from 'express-session';
import { AuthCredentialDto } from '../../common/dtos/auth-credential.dto';
import { AuthService } from './auth.service';
import { ApiDocs } from '../../common/decorators/docs.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiDocs({
    summary: 'User Signup',
    successStatus: 201,
    successExample: {
      id: { type: 'integer', example: 1 },
      email: { type: 'string', example: 'user@example.com' },
    },
    errorResponses: [
      {
        status: 409,
        message: 'Conflict - User already exists',
      },
    ],
  })
  @Post('signup')
  async signup(@Body() body: AuthCredentialDto, @Session() session: _session) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.user = { email: user.email, id: user.id };

    return user;
  }

  @ApiDocs({
    summary: 'User Signin',
    successStatus: 200,
    successExample: {
      id: { type: 'integer', example: 1 },
      email: { type: 'string', example: 'user@example.com' },
    },
    errorResponses: [
      {
        status: 401,
        message: 'Unauthorized - Invalid credentials',
      },
    ],
  })
  @Post('signin')
  async signin(@Body() body: AuthCredentialDto, @Session() session: _session) {
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.user = { email: user.email, id: user.id };
    return user;
  }

  @ApiDocs({
    summary: 'User Logout',
    successStatus: 200,
    successExample: {
      message: { type: 'string', example: 'Logged out successfully' },
    },
    errorResponses: [
      {
        status: 400,
        message: 'Bad Request - No active session found',
      },
    ],
  })
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
