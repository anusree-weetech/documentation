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

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');
  }

  handleConnection(client: Socket) {
    this.logger.log(`user connected: ${client.id}`);

    client.on('connect_error', (err) => {
      this.logger.error(`reconnection error for client: ${client.id}`, err);
    });
  }

  // events: something system can listen and respond to
  // 'message' named event 
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`recieved message ${data}`)
    client.emit('message', 'Hello client!')
  }

  // "custom" named event 
  @SubscribeMessage('customEvent')
  handleCustomEvent(@MessageBody()data:any, @ConnectedSocket() client:Socket){
    this.logger.log(`Custom event received: ${JSON.stringify(data)}`);
    client.emit('message', 'got custom event')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
