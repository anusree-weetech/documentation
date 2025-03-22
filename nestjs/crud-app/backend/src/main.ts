import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { RemoveSensitiveDataInterceptor } from './interceptors/remove-sensitive-data.interceptor';
import { StrictValidationPipe } from './validation/validation.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const session_secret = configService.get('SESSION_SECRET');
  const port = configService.get('PORT'); // Default to 3000 if PORT is not set

  app.use(
    session({
      secret: session_secret, // Secret key to sign the session ID cookie
      resave: false, // Whether to force the session to be saved even if it wasn't modified
      saveUninitialized: false, // Save a session that is new but not modified
      cookie: {
        httpOnly: true, // Helps mitigate XSS attacks
        secure: false, // Set to true if using HTTPS
        maxAge: 3600000, // Session expiration time (1 hour here)
      },
    }),
  );

  // Apply the interceptor globally
  app.useGlobalInterceptors(new RemoveSensitiveDataInterceptor());
  app.useGlobalPipes(new StrictValidationPipe());

  await app.listen(port);
}
bootstrap();
