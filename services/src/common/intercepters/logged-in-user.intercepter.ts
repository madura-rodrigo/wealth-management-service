import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

/** Intercept logged in user passed from the JWT token under request.user
 *  Add the userId to request body to use for relevent controllers */

@Injectable()
export class LoggedInUserIntercepter implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    req.body.userId = req.user.userId;
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
