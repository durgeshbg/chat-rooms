export type JoinData = {
  username: string;
  room: string;
};

export type Chat = {
  username: string;
  room: string;
  text: string;
};
export interface Message {
  type: 'join' | 'chat' | 'exit';
  payload: JoinData | Chat;
}
