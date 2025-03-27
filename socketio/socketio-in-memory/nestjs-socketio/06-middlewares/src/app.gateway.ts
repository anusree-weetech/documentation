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

  // This will be called for every new connection
  handleConnection(
    @ConnectedSocket() socket: Socket & { userData: { username: string } },
  ) {
    console.log(`New connection attempt: ${socket.id}`);

    // Middleware-like authentication
    if (!socket.handshake.auth.token && !socket.handshake.headers.token) {
      console.log('Authentication required');
      socket.emit('error', {
        type: 'authentication_error',
        message: 'Authentication required',
      });
    }

    // Modifying socket data before connection
    socket.userData = { username: 'JohnDoe' };

    console.log(
      `User connected: ${socket.id}, Username: ${socket.userData.username}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
