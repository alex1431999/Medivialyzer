import { io } from 'socket.io-client'
import { useTeamStore } from '../stores/teamStore.ts'
import { useNotifications } from '../composables/useNotifications.ts'
import { API_BASE_PATH } from '../utils/api/api.constants.ts'

export const socket = io(API_BASE_PATH)

socket.on('teamUpdated', async () => {
  const teamStore = useTeamStore()
  await teamStore.refresh()
})

socket.on('wasteAdded', async (memberName) => {
  const { notify } = useNotifications()
  const teamStore = useTeamStore()
  await teamStore.refresh()

  notify(`Member ${memberName} submitted their waste`, 'info')
})

socket.on('memberCreated', async (memberName) => {
  const { notify } = useNotifications()
  const teamStore = useTeamStore()
  await teamStore.refresh()

  notify(`Member ${memberName} has joined one of your teams`, 'info')
})
