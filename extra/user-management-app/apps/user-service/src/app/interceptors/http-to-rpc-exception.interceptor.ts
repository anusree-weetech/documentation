import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpToRpcInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const response = err.getResponse?.();
        const message =
          typeof response === 'string'
            ? response
            : response?.message || err.message || 'Unexpected error';

        const status = err.getStatus?.() || 500;

        return throwError(() => new RpcException({ message, status }));
      })
    );
  }
}
