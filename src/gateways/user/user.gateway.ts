import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';
import { AuthenticationGatewayMiddleware } from '../../shared/middlewares/authentication.gateway.middleware';
import { WsAuthenticationGatewayMiddleware } from '../../shared/middlewares/ws-authentication.gateway.middleware';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({
  middlewares: [AuthenticationGatewayMiddleware]
})
export class UserGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('UserGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @SubscribeMessage('showUser')
  show(client: any, payload: any): WsResponse<any> {
    if (!payload.userId) {
      throw new WsException('Missing user id.');
    }
    if (client.handshake.user.id !== payload.userId) {
      throw new WsException('Unable to find the user.');
    }

    const user = client.handshake.user;
    return { event: 'showUser', data: user };
  }
}
