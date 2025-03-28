import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Pool } from 'pg';
import { createAdapter } from '@socket.io/postgres-adapter';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() io: Server;
  private logger: Logger = new Logger('ApiGateway');
  private pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'yourpassword',
    database: 'socketDB',
    port: 5432,
  });

  async setupDatabase() {
    try {
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS socket_io_attachments (
          id          bigserial UNIQUE,
          created_at  timestamptz DEFAULT NOW(),
          payload     bytea
        );
      `);
      this.logger.log('✅ Database Table Verified');

      // Apply PostgreSQL Adapter for scaling
      this.io.adapter(createAdapter(this.pool));
      this.logger.log('✅ Socket.IO Postgres Adapter Initialized');
    } catch (error) {
      this.logger.error('❌ Database Initialization Failed', error);
    }

    this.pool.on('error', (err) => {
      this.logger.error('Postgres error', err);
    });
  }
  afterInit() {
    this.logger.log('Websocket server initialised');

    this.setupDatabase();
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
}
