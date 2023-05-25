/* istanbul ignore file */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  #logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (
      exception instanceof NotFoundException ||
      exception instanceof UnauthorizedException ||
      exception instanceof InternalServerErrorException ||
      exception instanceof BadRequestException
    ) {
      return super.catch(exception, host);
    }
    this.#logger.error(JSON.stringify(exception));

    super.catch(exception, host);
  }
}
