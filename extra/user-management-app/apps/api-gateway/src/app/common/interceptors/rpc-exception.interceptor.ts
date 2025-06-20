import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const message =
          err?.response?.message ||
          err?.message ||
          'Unexpected error from microservice.';

        const status = err?.response?.statusCode || err?.status || 500;

        const responseObject = {
          message: message.toString(),
          statusCode: status,
        };

        return throwError(() => new HttpException(responseObject, status));
      })
    );
  }
}
