import { Module } from '@nestjs/common';
import { RabbitmqTransportClient } from './rabbitmq-transport.client';

const ClientProxy = {
  provide: 'ClientProxy',  // injection token
  useFactory: () => new RabbitmqTransportClient(process.env.AMQP_URL, 'nestjs_book'),
};

@Module({
  imports: [],
  controllers: [],
  components: [ClientProxy],
  exports: [ClientProxy]
})
export class RabbitmqTransportModule {
}
