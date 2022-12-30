import {
  CallHandler,
  ExecutionContext,
  HttpException,
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
        //const contentLength = response.get('content-length');

        this.logger.log(
          `${method} ${url}: ${context.getClass().name} ${
            context.getHandler().name
          } invoke finished. STATUS:${statusCode} +${Date.now() - now}ms`,
        );
      }),
      catchError((err: HttpException) => {
        this.logger.error(`${err.getStatus()} ${err}`);
        return throwError(() => err);
      }),
    );
  }
}
