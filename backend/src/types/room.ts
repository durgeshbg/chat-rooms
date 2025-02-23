import { WebSocket } from 'ws';

export interface User {
  username: string;
  socket: WebSocket;
}
