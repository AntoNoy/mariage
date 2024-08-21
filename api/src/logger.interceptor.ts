import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { NO_LOGGER_KEY } from './no-logger.decorator';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger(LoggerInterceptor.name);

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const noLogger = this.reflector.getAllAndOverride<string[]>(NO_LOGGER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (noLogger && !noLogger.length) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest();

    const body = { ...req.body };

    noLogger?.map((hiddenParam) => {
      if (!body || body[hiddenParam] === undefined) {
        return;
      }
      body[hiddenParam] = '****Secret****';
    });

    const uuid = uuidv4();
console.log('-----', req.user)
    const message = `Uuid: ${uuid} - Method : ${req.method} - Route: ${req.originalUrl} - User: ${
      req.user?.username || 'guest'
    } - body: ${JSON.stringify(body)}`;

    this.logger.log(`Request - ${message}`);

    const now = Date.now();

    const rayIdData = req.header('CF-Ray') ? ` - CF_RAY_ID : ${req.header('CF-Ray')}` : '';

    const userAgent = req.header('user-agent') ? ` - User-Agent : ${req.header('user-agent')}` : '';

    const log = (level: 'error' | 'log') => () => {
      this.logger[level](
        `Response - ${message} - Time : ${Date.now() - now}ms - IP : ${req.header(
          'x-forwarded-for',
        )}${rayIdData}${userAgent}`,
      );
    };

    return next.handle().pipe(tap({ error: log('error'), next: log('log') }));
  }
}
