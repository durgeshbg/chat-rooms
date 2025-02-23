import { WebSocket } from 'ws';
import { User } from '../types/room';
import sendLog from './log';

export default function exitRoom(rooms: Map<string, User[]>, roomId: string, socket: WebSocket) {
  const room = rooms.get(roomId);
  if (room) {
    const newRoom = room.filter((user: User) => user.socket !== socket);
    if (newRoom.length) rooms.set(roomId, newRoom);
    else rooms.delete(roomId);
  }
  sendLog('success', 'Room exitted successfully', socket);
  return rooms;
}
