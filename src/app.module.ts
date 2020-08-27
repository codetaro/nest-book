import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { strategy } from './shared/config/passport-strategy.config';
import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryModule } from './modules/entry/entry.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nestbook'),
    // AuthenticationModule.forRoot('jwt'),
    AuthenticationModule,
    UserModule,
    EntryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware)
      .with(strategy)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/users/:id', method: RequestMethod.GET },
        { path: '/users/:id', method: RequestMethod.PUT },
        { path: '/users/:id', method: RequestMethod.DELETE },
      );
  }
}
