import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // allow frontend connections
})
export class TeamGateway {
  @WebSocketServer()
  server: Server;

  // Broadcast example
  sendToAll(msg: string) {
    this.server.emit('broadcast', msg);
  }
}
