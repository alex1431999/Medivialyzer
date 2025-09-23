import { socket } from './realtime.ts'

export function joinTeamChannels(teamIds: string[]) {
  teamIds.forEach((id) => {
    socket.emit('joinTeam', id)
  })
}
