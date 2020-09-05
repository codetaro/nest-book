import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from './shared/adapters/ws.adapter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '../../client'));
  // app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}

bootstrap();
