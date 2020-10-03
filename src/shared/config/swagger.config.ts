import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Blog Application')
  .setDescription('APIs for the example blog application.')
  .setVersion('1.0.0')
  // .setTermsOfService('http://swagger.io/terms/')
  // .setContactEmail('admin@example.com')
  // .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
  .setHost('localhost:3000')
  .setBasePath('/')
  .setSchemes('http')
  .setExternalDoc('For more information', 'http://swagger.io')
  .addTag('blog', 'application purpose')
  .addTag('nestjs', 'framework')
  .addBearerAuth('Authorization', 'header', 'apiKey')
  .build();
