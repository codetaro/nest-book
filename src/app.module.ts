import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { strategy } from './shared/config/passport-strategy.config';
import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryModule } from './modules/entry/entry.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EntryController } from './modules/entry/entry.controller';
import { KeywordModule } from './modules/keyword/keyword.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nestbook'),
    // AuthenticationModule.forRoot('jwt'),
    AuthenticationModule,
    UserModule,
    EntryModule,
    // UserGatewayModule,
    // CommentGatewayModule,
    KeywordModule
  ],
  controllers: [],
  providers: [
    // AppGateway
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    const userControllerAuthenticatedRoutes = [
      { path: '/users', method: RequestMethod.GET },
      { path: '/users/:userId', method: RequestMethod.GET },
      { path: '/users/:userId', method: RequestMethod.PUT },
      { path: '/users/:userId', method: RequestMethod.DELETE },
    ];

    consumer
      .apply(AuthenticationMiddleware)
      .with(strategy)
      .forRoutes(
        ...userControllerAuthenticatedRoutes,
        EntryController,
      );
  }
}
