import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LoggerMiddleware } from './app/common/middlewares/logger.middleware';
import { RpcExceptionInterceptor } from './app/common/interceptors/rpc-exception.interceptor';
import { HttpResponseInterceptor } from './app/common/interceptors/http-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RpcExceptionInterceptor(), new HttpResponseInterceptor());


  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
