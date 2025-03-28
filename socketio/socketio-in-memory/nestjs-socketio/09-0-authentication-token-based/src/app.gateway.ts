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
import * as jwt from 'jsonwebtoken';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() io: Server;
  private logger: Logger = new Logger('ApiGateway');

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');

    // Middleware for JWT Authentication
    server.use((socket: Socket, next) => {
      const token = socket.handshake.auth.token || socket.handshake.headers.token;

      if (!token) return next(new Error('Authentication required'));

      jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) return next(new Error('Invalid token'));
        (socket as any).user = decoded; // Attach user data
        next();
      });
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
