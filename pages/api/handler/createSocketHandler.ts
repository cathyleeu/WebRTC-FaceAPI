import { Server, Socket } from "socket.io";

export default function createSocketHandler(server:Server) {
  return function handler(socket: Socket) {
    function joinRoom(roomId:string) {
      // const roomClients = server.of("/").adapter.rooms.get(roomId);
      // if(roomClients?.size == 0) {
      //   server.of("/").adapter.on("create-room", (roomId:string) => {
      //     console.log(`room ${roomId} was created`);
      //   });
        
      // }
      console.log(`join the Room with ${roomId}`)
      socket.join(roomId);
    }
  
    function leaveRoom(roomId:string) {
      console.log(`leave the Room with ${roomId}`)
      socket.leave(roomId)
    }
  

    socket.on('join', joinRoom);
    socket.on('leave', leaveRoom)
  
    socket.on('ready', (room) => {
      socket.broadcast.to(room).emit('ready');
    });
  
    socket?.on('candidate', (event) => {
      socket.broadcast.to(event.room).emit('candidate', event);
    })
  
    socket.on('offer', (event) => {
      socket.broadcast.to(event.room).emit('offer',event.sdp);
    })
    socket?.on('answer', (event) => {
      socket.broadcast.to(event.room).emit('answer',event.sdp);
    })  
  }
}