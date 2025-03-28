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
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() io: Server;
  private logger: Logger = new Logger('ApiGateway');

  private connectionAttempts = new Map<string, number[]>(); // Rate limit tracking
  private bannedIPs = new Set<string>(['192.168.1.1']); // IP ban list

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`User connected with id: ${socket.id}`);

    const ip = socket.handshake.address;
    const now = Date.now();

    // **Rate Limiting for WebSocket Connections**
    if (!this.connectionAttempts.has(ip)) {
      this.connectionAttempts.set(ip, []);
    }
    const timestamps = this.connectionAttempts.get(ip) || [];
    timestamps.push(now);

    // Keep only attempts within the last minute
    this.connectionAttempts.set(
      ip,
      timestamps.filter((time) => now - time < 60 * 1000),
    );

    if (timestamps.length > 10) {
      this.logger.warn(`Rate limit exceeded for IP: ${ip}`);
      socket.disconnect();
      return;
    }

    // **IP Banning Mechanism**
    if (this.bannedIPs.has(ip)) {
      this.logger.warn(`Banned IP attempted connection: ${ip}`);
      socket.disconnect();
      return;
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { text: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Received message: ${JSON.stringify(data)}`);

    if (!data.text) {
      throw new WsException('Invalid message');
    }

    return { status: 'ok' };
  }
}
