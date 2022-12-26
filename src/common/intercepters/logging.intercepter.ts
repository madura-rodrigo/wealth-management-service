import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingIntercepter implements NestInterceptor {
  private readonly logger = new Logger(LoggingIntercepter.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, path: url } = request;
    this.logger.log(
      `${method} ${url}: ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `${method} ${url}: ${context.getClass().name} ${
            context.getHandler().name
          } invoke finished. STATUS:${statusCode} ElAPSED_TIME:${
            Date.now() - now
          }ms`,
        );
      }),
      catchError((err) => {
        this.logger.error(
          `${err} ${err.response.status} ${err.response.error}`,
        );
        return throwError(() => err);
      }),
    );
  }
}
