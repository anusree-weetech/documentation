// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CreateUserDto } from './user/dto/create-user.dto';
import { setupSwagger } from './common/config/swagger.config';
// import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('Simple API without Swagger decorators')
    .setVersion('1.0')
    .build();
  // const schemas = validationMetadatasToSchemas();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CreateUserDto],
  });
  SwaggerModule.setup('api', app, document); // Swagger available at /api
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
