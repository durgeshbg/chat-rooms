import { WebSocket } from 'ws';
import { Log, LogTitle } from '../types/log';

export default function sendLog(title: LogTitle, description: string, socket: WebSocket) {
  const log: Log = {
    type: 'log',
    payload: {
      title,
      description,
    },
  };
  console.log(`${log.type.toUpperCase()}: ${log.payload.title.toUpperCase()} - ${log.payload.description}`);
  socket.send(JSON.stringify(log));
}
