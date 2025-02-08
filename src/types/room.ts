import { WebSocket } from 'ws';

export interface User {
  username: string;
  roomId: string;
  socket: WebSocket;
}
