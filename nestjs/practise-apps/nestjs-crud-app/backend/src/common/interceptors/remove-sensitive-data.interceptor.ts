import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class RemoveSensitiveDataInterceptor implements NestInterceptor {
  //nest interceptor internally uses handler that has an observable inside teh intercpt function
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>, // handler
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.password) {
              delete item.password;
            } else if (item.user?.password) {
              delete item.user.password;
            }
          });
        }

        if (data) {
          if (data.password) {
            delete data.password;
          } else if (data.user?.password) {
            delete data.user.password;
          }
        }
        return data;
      }),
    );
  }
}

// Observable = A container that can hold and emit data over time.
// Subscription = The action of listening to the Observable and getting the data when it’s ready.
// ExecutionContext gives us details about the request and response inside the interceptor.
// handler lets us hold the data and then edit it
