// src/config/swagger.config.ts

import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { generateExample } from '../utils/example-generator.util';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { isSchemaObject } from '../utils/schema-type-guard.util';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('API with auto-generated Swagger examples')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Inject examples for each DTO
  const examples = {
    CreateUserDto: generateExample(CreateUserDto),
    UpdateUserDto: generateExample(UpdateUserDto),
  };

  for (const [name, example] of Object.entries(examples)) {
    if (document.components?.schemas?.[name]) {
      const schema = document.components.schemas[name];
      if (isSchemaObject(schema)) {
        schema.example = example;
      }
    }
  }

  SwaggerModule.setup('api', app, document);
}
