export interface Message {
  type: 'join' | 'exit' | 'chat';
  payload: {
    username: string;
    text: string;
    room: string;
  };
}
