import { WebSocket } from 'ws';
import { User } from '../types/room';
import { JoinData } from '../types/message';
import sendLog from './log';

export default function joinRoom(rooms: Map<string, User[]>, payload: JoinData, socket: WebSocket) {
  let room = rooms.get(payload.room);
  const user: User = {
    username: payload.username,
    socket,
  };
  if (room) {
    let existingUser = false;
    room.forEach((user) => {
      if (user.socket === socket) existingUser = true;
    });
    if (!existingUser) {
      room.push(user);
      sendLog('success', 'Room joined successfully', socket);
    }
  } else {
    rooms.set(payload.room, [user]);
    sendLog('success', 'Room created successfully', socket);
  }
  return rooms;
}
