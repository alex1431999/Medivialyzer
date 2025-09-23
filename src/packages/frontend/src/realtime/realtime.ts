import { io } from 'socket.io-client'
import { useTeamStore } from '../stores/teamStore.ts'

export const socket = io('http://localhost:3001')

// Receive
socket.on('teamUpdated', async () => {
  const teamStore = useTeamStore()
  await teamStore.refresh()
})
