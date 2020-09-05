import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';
import { CommentService } from '../../modules/comment/comment.service';
import { AuthenticationGatewayMiddleware } from '../../shared/middlewares/authentication.gateway.middleware';
import { WsAuthenticationGatewayMiddleware } from '../../shared/middlewares/ws-authentication.gateway.middleware';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({
  middlewares: [AuthenticationGatewayMiddleware],
})
export class CommentGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('CommentGateway');

  constructor(private readonly commentService: CommentService) {
  }

  afterInit(server: Server): any {
    this.logger.log('Init');
  }

  @SubscribeMessage('indexComment')
  async index(client, data): Promise<WsResponse<any>> {
    if (!data.entryId) {
      throw new WsException('Missing entry id.');
    }

    const comments = await this.commentService.findAll({
      where: { entryId: data.entryId },
    });

    return { event: 'indexComment', data: comments };
  }

  @SubscribeMessage('showComment')
  async show(client: any, payload: any): Promise<WsResponse<any>> {
    if (!payload.entryId) {
      throw new WsException('Missing entry id.');
    }
    if (!payload.commentId) {
      throw new WsException('Missing comment id.');
    }

    const comment = await this.commentService.findOne({
      where: {
        id: payload.commentId,
        entryId: payload.entryId,
      },
    });

    return { event: 'showComment', data: comment };
  }
}
