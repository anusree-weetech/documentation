import { ValidationPipe } from '@nestjs/common';

export class StrictValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw error if unknown fields are present
      transform: true, // Automatically transform input data to match DTO types
    });
  }
}
