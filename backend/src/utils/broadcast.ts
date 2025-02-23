import { User } from '../types/room';
import { Message } from '../types/message';
import { WebSocket } from 'ws';

export default function broadcast(rooms: Map<string, User[]>, message: Message, socket: WebSocket) {
  for (const [roomId, room] of rooms) {
    if (roomId === message.payload.room) {
      room.forEach((user) => {
        if (user.socket !== socket) {
          user.socket.send(JSON.stringify(message));
        }
      });
    }
  }
}
