import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// no feature for rooms in postman yet
@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ApiGateway');
  chatNamespace: any;

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');

    // Initialize the '/chat' namespace
    this.chatNamespace = this.server.of('/chat');

    // Handle connections for /chat namespace
    this.chatNamespace.on('connection', (socket: Socket) => {
      console.log('User connected to /chat namespace:', socket.id);

      socket.on('message', (msg: string) => {
        console.log(`Message in /chat: ${msg}`);
        // Send message to all in /chat namespace
        this.chatNamespace.emit('chatMessage', msg);
      });
    });

    // ✅ Creating '/secure' namespace with authentication middleware
    this.server.of('/secure').use((socket: Socket, next: any) => {
      // Middleware for authentication (checking token)
      if (
        socket.handshake.auth.token === 'valid_token' ||
        socket.handshake.headers.token === 'valid_token'
      ) {
        next();
      } else {
        next(new Error('Unauthorized'));
      }
    });

    // Handle connections for /secure namespace
    this.server.of('/secure').on('connection', (socket: Socket) => {
      console.log('User connected to /secure namespace:', socket.id);
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`user connected: ${client.id}`);

    client.on('connect_error', (err) => {
      this.logger.error(`reconnection error for client: ${client.id}`, err);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
