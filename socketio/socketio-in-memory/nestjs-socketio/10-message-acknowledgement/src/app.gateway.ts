import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
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

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { text: string },
    @ConnectedSocket() client: Socket,
  ): { status: string; message?: string } {
    this.logger.log(`📩 Received message: ${JSON.stringify(data)}`);

    // Simulate processing & send acknowledgment
    if (data.text) {
      return { status: 'ok' };
    } else {
      return { status: 'error', message: 'Invalid message' };
    }
  }
}
