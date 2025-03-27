import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ApiGateway');

  //   predefined lifecycle hooks in NestJS for WebSockets and Socket.IO.
  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');
  }

  handleConnection(client: Socket) {
    this.logger.log(`user connected: ${client.id}`);

    client.on('message', (data) => {
      this.logger.log(`got message from client: ${client.id}`);
      this.server.emit('message', 'got message');
    });

    client.on('connect_error', (err) => {
      this.logger.error(`reconnection error for client: ${client.id}`, err);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
