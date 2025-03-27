import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ApiGateway');

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`User connected with id: ${socket.id}`);

    // Handling custom errors
    socket.on('error', (err) => {
      this.logger.error(`Custom error received: ${err}`);
    });

    // Detecting reconnections (connect_error event)
    socket.on('connect_error', (err) => {
      this.logger.error(`Reconnection error for ${socket.id}: ${err}`);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
