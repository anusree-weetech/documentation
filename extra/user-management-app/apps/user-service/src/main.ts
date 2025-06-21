import { NestFactory } from '@nestjs/core';
import { UserModule } from './app/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpToRpcInterceptor } from './app/interceptors/http-to-rpc-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  // Microservice to handle Redis events from other services
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  // Microservice to handle TCP requests (e.g., from Gateway)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002, // The port your gateway will use to connect
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields
      forbidNonWhitelisted: true, // throw error if unknown field
      transform: true, // auto-transform payloads to DTO class types
    })
  );


  app.useGlobalInterceptors(new HttpToRpcInterceptor());

  Logger.log('🚀 User Service is listening via Redis & TCP port 3002');
}

bootstrap();
