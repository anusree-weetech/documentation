import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ApiGateway');
  private users: string[] = [];

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');
  }

  handleConnection(client: Socket) {
    this.logger.log(`user connected: ${client.id}`);
    this.users.push(client.id);

    // Notify others about the new user
    client.broadcast.emit('notification', 'A new user has joined!');

    client.on('connect_error', (err) => {
      this.logger.error(`reconnection error for client: ${client.id}`, err);
    });
  }

  // Handle incoming "message" event
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket) {
    // Broadcast an announcement to all clients
    this.server.emit('announcement', 'Server update available!');

    if (this.users.length > 1) {
      console.log(
        'Message to user:',
        this.users[0],
        ' current user:',
        client.id,
      );
      // Send a private message to the second user in the list
      this.server.to(this.users[1]).emit('privateMessage', 'Hello, friend!');
    }
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
