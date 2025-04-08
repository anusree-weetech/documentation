import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class LoggerService {
  private readonly id = Math.random().toString(36).substring(2, 7);
  constructor() {
    console.log('instance instantiated');
  }

  log(msg: string) {
    console.log(`[Logger ${this.id}]: ${msg} ${this.id}`);
    return `[Logger ${this.id}]: ${msg} ${this.id}`;
  }
}
