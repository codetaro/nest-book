import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.provider';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userProvider, UserService],
  exports: [UserService],
})
export class UserModule {
}
