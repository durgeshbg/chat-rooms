import { RawData } from 'ws';
import { Message } from '../types/message';

export default function extractData(data: RawData) {
  const message: Message = JSON.parse(data.toString());
  return message;
}
