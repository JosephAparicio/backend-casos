import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '@/common/dto/response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    const httpResponse = context.switchToHttp().getResponse<Response>();
    const statusCode = httpResponse.statusCode;

    const buildResponse = (result: unknown) => {
      if (typeof result === 'object' && result !== null && 'data' in result) {
        const typed = result as { message?: string; data?: T };
        return {
          message: typed.message ?? 'Operación exitosa',
          data: typed.data ?? (null as T | null),
        };
      }

      return {
        message: 'Operación exitosa',
        data: result as T,
      };
    };

    return next.handle().pipe(
      map((data: unknown) => {
        const normalized = buildResponse(data);
        return new ResponseDto<T>(
          statusCode,
          normalized.message,
          normalized.data as T,
        );
      }),
    );
  }
}
