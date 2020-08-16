import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';
import { strategy } from './shared/config/passport-strategy.config';
import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule.forRoot('jwt'),
    UserModule,
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
