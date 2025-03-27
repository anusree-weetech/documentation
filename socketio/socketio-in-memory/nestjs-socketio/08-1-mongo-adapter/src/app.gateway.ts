import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import * as redisAdapter from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ApiGateway');
  private pubClient = new Redis('redis://localhost:6379');
  private subClient = this.pubClient.duplicate();

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');
    server.adapter(redisAdapter.createAdapter(this.pubClient, this.subClient));
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`User connected with id: ${socket.id}`);

    // Example of broadcasting a message when a user sends 'message'
    socket.on('message', () => {
      this.server.emit('message', 'Broadcasted message');
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
