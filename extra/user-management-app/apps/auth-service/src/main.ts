import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './app/auth.module';
import { RpcException } from '@nestjs/microservices';
import { HttpToRpcInterceptor } from './app/interceptors/http-to-rpc-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors
          .map((err) => Object.values(err.constraints).join(', '))
          .join('; ');
        return new RpcException(`Validation failed: ${messages}`);
      },
    })
  );

  app.useGlobalInterceptors(new HttpToRpcInterceptor());

  await app.listen();
  Logger.log(`🚀 Auth Service is running and listening on TCP port 3001`);
}

bootstrap();
