import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface ResponsePayload {
  status: number;
  message: string | string[];
  error: string;
  timestamp: string;
}

@Catch()
export class GlobalException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responsePayload: ResponsePayload = {
      status: 500,
      message: 'Something went wrong',
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof HttpException) {
      const exceptionResponse: object = exception.getResponse() as object;

      responsePayload.status = exception.getStatus();
      responsePayload.message = exceptionResponse['message'] as
        | string
        | string[];
      responsePayload.error = exceptionResponse['error'] as string;
    }

    console.log(exception);

    response.status(responsePayload.status).send(responsePayload);
  }
}
