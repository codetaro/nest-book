import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.provider';

@Module({
  imports: [],
  providers: [userProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
