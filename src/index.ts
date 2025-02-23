import WebSocket, { WebSocketServer } from 'ws';
import { User } from './types/room';
import * as uuid from 'uuid';
import sendLog from './utils/log';
import extractData from './utils/extractData';
import broadcast from './utils/broadcast';
import exitRoom from './utils/exitRoom';
import joinRoom from './utils/joinRoom';

const wss = new WebSocketServer({ port: 8080 });
let rooms = new Map<string, User[]>();

wss.on('connection', (socket: WebSocket) => {
  console.log('Connected: ws://localhost:8080');
  socket.on('message', (data) => {
    try {
      const { type, payload } = extractData(data);
      if (uuid.validate(payload.room)) {
        if (type === 'join') rooms = joinRoom(rooms, payload, socket);
        if (type === 'chat') broadcast(rooms, { type, payload }, socket);
        if (type === 'exit') rooms = exitRoom(rooms, payload.room, socket);
      } else sendLog('error', 'Invalid room ID', socket);
    } catch (error) {
      sendLog('error', 'Invalid JSON', socket);
    }
  });

  // If client disconnects
  socket.on('close', () => {
    for (const [roomId, room] of rooms) {
      let newRoom = room.filter((user) => user.socket !== socket);
      if (newRoom.length) rooms.set(roomId, newRoom);
      else rooms.delete(roomId);
    }
    console.log('Disconnected: ws://localhost:8080');
  });
});
