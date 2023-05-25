/* istanbul ignore file */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/http-exception.filter';
import { ValidationPipe } from './validations/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(Number(process.env.APP_PORT) || 3000);
}
bootstrap();
