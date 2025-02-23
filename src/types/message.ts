export type MessageType = 'join' | 'exit' | 'chat';

export interface ChatPayload {
  username: string;
  text: string;
  room: string;
}
export interface JoinExitPayload {
  username: string;
  room: string;
}
export type Payload = ChatPayload | JoinExitPayload;

export interface Message {
  type: MessageType;
  payload: Payload;
}

export interface ChatBubble {
  username: string;
  text: string;
  room: string;
  self: boolean;
}
