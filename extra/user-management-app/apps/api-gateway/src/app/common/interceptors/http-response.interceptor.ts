import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const statusCode = data?.statusCode || HttpStatus.OK;

        res.status(statusCode);

        return data;
      })
    );
  }
}
