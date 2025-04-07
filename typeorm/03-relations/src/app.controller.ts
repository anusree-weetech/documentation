import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountDto } from './dtos/account.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sendAmount(@Body() body: AccountDto) {
    const { id, amount } = body;
    return this.appService.addAmount(id, amount);
  }
}
