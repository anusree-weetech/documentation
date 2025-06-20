import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const body = req.body;

    console.log(`[${method}] ${originalUrl} | Body:`, body);

    const oldSend = res.send;
    res.send = function (data) {
      console.log(`Response to [${method}] ${originalUrl} =>`, data);
      return oldSend.apply(res, arguments);
    };

    next();
  }
}
