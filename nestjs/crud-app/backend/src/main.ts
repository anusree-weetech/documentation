import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { RemoveSensitiveDataInterceptor } from './common/interceptors/remove-sensitive-data.interceptor';
import { StrictValidationPipe } from './common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as express from 'express';
import { join } from 'path';

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

  const config = new DocumentBuilder()
    .setTitle('NestJS Crud App API')
    .setDescription('API Documentation using RapiDoc')
    .setVersion('1.0')
    .addBearerAuth() // Adds authentication option
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs2', app, document); //to serve docs wihth plain swagger ui

  // Ensure the documentation directory exists. to serve docs with rapidoc
  const documentationPath = join(__dirname, '..', 'src/documentation');
  if (!fs.existsSync(documentationPath)) {
    fs.mkdirSync(documentationPath, { recursive: true });
  }

  // Save Swagger JSON
  fs.writeFileSync(
    join(documentationPath, 'swagger.json'),
    JSON.stringify(document),
  );

  // Serve static files (swagger.json and rapi-doc.html)
  app.use(
    '/docs',
    (req, res, next) => {
      const protocol = req.protocol; // http or https
      const host = req.get('host'); // domain or IP

      document.servers = [{ url: `${protocol}://${host}` }];

      next();
    },
    express.static(join(documentationPath)),
  );
  app.use(
    '/swagger.json',
    express.static(join(documentationPath, '/swagger.json')),
  );

  await app.listen(port);
}
bootstrap();
