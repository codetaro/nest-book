import * as WebSocket from 'ws';
import { INestApplication, WebSocketAdapter } from '@nestjs/common';
import { WsAuthenticationGatewayMiddleware } from '../middlewares/ws-authentication.gateway.middleware';
import { UserModule } from '../../modules/user/user.module';
import { UserService } from '../../modules/user/user.service';
import { MessageMappingProperties } from '@nestjs/websockets';
import { fromEvent, NEVER, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

export class WsAdapter implements WebSocketAdapter {
  constructor(private app: INestApplication) {
  }

  create(port: number) {
    return new WebSocket.Server({
      server: this.app.getHttpServer(),
      verifyClient: ({ origin, secure, req }, next) => {
        return new WsAuthenticationGatewayMiddleware(
          this.app.select(UserModule).get(UserService),
        ).resolve()(req, next);
      },
    });
  }

  bindClientConnect(server: any, callback: (...args) => void): any {
    server.on('connection', callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data) => Observable<any>,
  ) {
    fromEvent(client, 'message')
      .pipe(
        switchMap(buffer =>
          this.bindMessageHandler(buffer, handlers, process)),
        filter(result => !!result),
      )
      .subscribe(response => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer,
    handlers: MessageMappingProperties[],
    process: (data) => Observable<any>,
  ): Observable<any> {
    const data = JSON.parse(buffer.data);
    const messageHandler = handlers.find(
      handler => handler.message === data.type,
    );
    if (!messageHandler) {
      return NEVER;
    }
    const { callback } = messageHandler;
    return process(callback(data));
  }

  close(server) {
    server.close();
  }
}
