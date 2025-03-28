import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() io: Server;
  private logger: Logger = new Logger('ApiGateway');

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');

    // Middleware for Role-based Access Control (RBAC)
    server.use((socket: Socket, next) => {
      const userRole =
        socket.handshake.auth.role || socket.handshake.headers.role;

      if (userRole !== 'admin') {
        return next(new Error('Permission denied'));
      }

      next();
    });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`User connected with id: ${client.id}`);

    // Example of broadcasting a message when a user sends 'message'
    client.on('message', () => {
      this.io.emit('message', 'Broadcasted message');
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }

  @SubscribeMessage('connect_error')
  handleConnectError(socket: Socket, err: any) {
    this.logger.error(`Reconnection Error: ${err.message}`);
  }
}
