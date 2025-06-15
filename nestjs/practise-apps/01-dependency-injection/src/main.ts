/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('API Docs')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);

  // await app.listen(3000);

  // // List all routes
  // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const server = app.getHttpServer();
  // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  // const router = server._events.request._router;

  // console.log('\n📌 All Registered Routes:');
  // // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  // const availableRoutes= router.stack
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  //   .filter((layer) => layer.route)
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   .forEach((layer) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //     const path = layer.route?.path;
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  //     const method = Object.keys(layer.route.methods)[0]?.toUpperCase();
  //     console.log(`→ ${method.padEnd(6)} ${path}`);
  //   });

  // console.table(availableRoutes);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
