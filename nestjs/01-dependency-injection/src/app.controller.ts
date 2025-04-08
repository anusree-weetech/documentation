import { Controller, Get } from '@nestjs/common';
import { AppService, LoggerService } from './app.service';

@Controller('di1')
export class AppController {
  [x: string]: any;
  constructor(
    private readonly appService: AppService,
    private readonly logger1: LoggerService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  test() {
    return this.logger1.log('Logger 1');
  }
}

@Controller('di2')
export class DiController {
  constructor(private readonly logger2: LoggerService) {}

  @Get()
  test() {
    return this.logger2.log('Logger 2');
  }
}

@Controller('manual1')
export class ManualController {
  @Get()
  test() {
    const logger1 = new LoggerService();

    return logger1.log('Logger 1');
  }
}

@Controller('manual2')
export class Manual2Controller {
  @Get()
  test() {
    const logger2 = new LoggerService();

    return logger2.log('Logger 2');
  }
}
