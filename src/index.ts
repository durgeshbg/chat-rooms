import WebSocket, { WebSocketServer } from 'ws';
import { Log, Message } from './types/message';
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
            if (!existingUser) {
              room.push(user);
              const successLog: Log = {
                type: 'log',
                payload: {
                  title: 'success',
                  description: 'Room joined successfully',
                },
              };
              socket.send(JSON.stringify(successLog));
            }
          } else {
            rooms.set(message.payload.room, [user]);
            const successLog: Log = {
              type: 'log',
              payload: {
                title: 'success',
                description: 'Room created successfully',
              },
            };
            socket.send(JSON.stringify(successLog));
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
          const successLog: Log = {
            type: 'log',
            payload: {
              title: 'success',
              description: 'Room exitted successfully',
            },
          };
          socket.send(JSON.stringify(successLog));
        }
      } else {
        const errorLog: Log = {
          type: 'log',
          payload: {
            title: 'error',
            description: 'Invalid room ID',
          },
        };
        socket.send(JSON.stringify(errorLog));
      }
    } catch (error) {
      const errorLog: Log = {
        type: 'log',
        payload: {
          title: 'error',
          description: 'Invalid JSON',
        },
      };
      socket.send(JSON.stringify(errorLog));
    }
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
