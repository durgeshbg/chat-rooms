import { ChatPayload, JoinExitPayload, Message, MessageType } from '../types/message';

export default function createMessage(type: MessageType, payload: ChatPayload | JoinExitPayload) {
  const message: Message = {
    type,
    payload,
  };
  return message;
}
