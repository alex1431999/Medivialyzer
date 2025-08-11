import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function generateOpenApiSpecs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Write spec to file (so generator tools can read it)
  await import('fs').then((fs) =>
    fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2)),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: '*' });

  await generateOpenApiSpecs(app);

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap()
  .then(() => console.log('App running'))
  .catch(console.error);
