import WebSocket, { WebSocketServer } from 'ws';
import { Message } from './types/message';
import { User } from './types/room';
import * as uuid from 'uuid';

const wss = new WebSocketServer({ port: 8080 });
let rooms = new Map<string, User[]>();

wss.on('connection', (socket: WebSocket) => {
  socket.on('message', (data) => {
    try {
      const message: Message = JSON.parse(data.toString());

      if (uuid.validate(message.payload.room)) {
        // Joining a room
        if (message.type === 'join') {
          let room = rooms.get(message.payload.room);
          const user: User = {
            username: message.payload.username,
            roomId: message.payload.room,
            socket,
          };
          if (room) {
            let existingUser = false;
            room.forEach((user) => {
              if (user.socket === socket) {
                existingUser = true;
              }
            });
            if (!existingUser) room.push(user);
          } else {
            rooms.set(message.payload.room, [user]);
          }
        }

        // Broadcasting a message
        if (message.type === 'chat') {
          for (const [roomId, room] of rooms) {
            if (roomId === message.payload.room) {
              room.forEach((user) => {
                user.socket.send(data.toString());
              });
            }
          }
        }

        // Exiting a room
        if (message.type === 'exit') {
          const room = rooms.get(message.payload.room);
          if (room) {
            const newRoom = room.filter((user) => user.socket !== socket);
            if (newRoom.length) rooms.set(message.payload.room, newRoom);
            else rooms.delete(message.payload.room);
          }
        }
      }
    } catch (error) {}
    console.log(rooms);
  });

  // If client disconnects
  socket.on('close', () => {
    for (const [roomId, room] of rooms) {
      let newRoom = room.filter((user) => user.socket !== socket);
      if (newRoom.length) rooms.set(roomId, newRoom);
      else rooms.delete(roomId);
    }
  });
});
