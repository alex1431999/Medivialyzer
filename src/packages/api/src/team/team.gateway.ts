import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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

  @SubscribeMessage('joinTeam')
  async handleJoin(
    @MessageBody() teamId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(`team-${teamId}`);
  }

  notifyTeamUpdated(teamId: string) {
    this.server.to(`team-${teamId}`).emit('updated');
  }

  notifyWasteAdded(teamId: string, clientName: string) {
    this.server.to(`team-${teamId}`).emit('wasteAdded', clientName);
  }

  notifyMemberCreated(teamId: string, clientName: string) {
    this.server.to(`team-${teamId}`).emit('memberCreated', clientName);
  }
}
