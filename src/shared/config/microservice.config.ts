import { RedisOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig = {
  transport: Transport.TCP,
  options: { port: 5667 },
};
