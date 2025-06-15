import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 4001 },
  });
  await app.listen();
}
bootstrap();
