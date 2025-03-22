import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export class RateLimiterMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });
  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
