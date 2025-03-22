import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class RateLimiterMiddleware implements NestMiddleware {
    private limiter;
    use(req: Request, res: Response, next: NextFunction): void;
}
