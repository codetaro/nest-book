import * as fs from 'fs-extra';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './shared/config/swagger.config';
import * as path from 'path';

export async function writeDoc(app) {
  // const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  fs.ensureDirSync(path.join(process.cwd(), 'dist'));
  fs.writeJsonSync(
    path.join(process.cwd(), 'dist', 'api-doc.json'),
    document,
    { spaces: 2 });

  return document;
}

// writeDoc();
