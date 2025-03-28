import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as mongodb from 'mongodb';
import * as mongoAdapter from '@socket.io/mongo-adapter';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ApiGateway');
  private mongoClient: mongodb.MongoClient;
  private mongoCollection: mongodb.Collection;

  private async initializeMongoAdapter() {
    const DB = 'socketDB';
    const COLLECTION = 'socket.io-adapter';

    this.mongoClient = new mongodb.MongoClient(
      'mongodb://localhost:27017/?replicaSet=rs0&directConnection=true',
    );
    await this.mongoClient.connect();
    const db = this.mongoClient.db(DB);

    // Get list of collections
    const collections = await db
      .listCollections({ name: COLLECTION })
      .toArray();

    // Check if collection exists, create if it doesn't
    if (collections.length === 0) {
      await db.createCollection(COLLECTION, {
        capped: true,
        size: 1e6,
      });
      console.log('✅ Collection created');
    } else {
      console.log('✅ Collection already exists');
    }

    this.mongoCollection = db.collection(COLLECTION);
    this.server.adapter(mongoAdapter.createAdapter(this.mongoCollection));
  }

  afterInit(server: Server) {
    this.logger.log('Websocket server initialised');

    this.initializeMongoAdapter();
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`User connected with id: ${client.id}`);

    // Example of broadcasting a message when a user sends 'message'
    client.on('message', () => {
      this.server.emit('message', 'Broadcasted message');
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`user disconnected: ${client.id}`);
  }
}
