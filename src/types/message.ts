type RoomData = {
  username: string;
  room: string;
};
type Chat = {
  username: string;
  room: string;
  text: string;
};
type Payload = RoomData | Chat;
export interface Message {
  type: 'join' | 'chat' | 'exit';
  payload: Payload;
}

export interface Log {
  type: 'log';
  payload: {
    title: string;
    description: string;
  };
}
