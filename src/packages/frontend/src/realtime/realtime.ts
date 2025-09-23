import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

// Receive
socket.on('messageReceived', (data) => {
  console.log(data)
})
