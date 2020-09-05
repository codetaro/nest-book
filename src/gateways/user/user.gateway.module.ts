import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { UserGateway } from './user.gateway';

@Module({
  imports: [UserModule],
  providers: [UserGateway],
})
export class UserGatewayModule {}
