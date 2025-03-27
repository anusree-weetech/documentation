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

// no feature for rooms in postman yet
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

  // Handle "enter" event (Joining a Room)
  @SubscribeMessage('enter')
  handleEnter(@ConnectedSocket() client: Socket) {
    client.join('room1');
    console.log(`${client.id} joined room1`);

    // Send message to all users in "room1"
    this.server.to('room1').emit('roomMessage', 'Hello, Room 1!');
  }

  // Handle "leave" event (Leaving a Room)
  @SubscribeMessage('leave')
  handleLeave(@ConnectedSocket() client: Socket) {
    client.leave('room1');
    console.log(`${client.id} left room1`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
