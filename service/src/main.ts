import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './common/swagger';
import { GlobalValidationPipe } from './common/validation.pipe';
import { EnvironmentVariables } from './common/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get env config
  const configService: ConfigService<EnvironmentVariables> =
    app.get(ConfigService);

  // compress response
  app.use(compression());

  // enable CORS, TODO: modify it for production
  app.enableCors({ origin: '*' });

  // to have a consistent response structure
  app.useGlobalPipes(GlobalValidationPipe);

  // set security headers
  app.use(helmet());

  // swagger config
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // set swagger path
  SwaggerModule.setup('/docs', app, document);

  // set service port
  const port = configService.get('SERVICE_PORT');

  // run application
  await app.listen(port, '0.0.0.0', async () => {
    console.log(`server is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
