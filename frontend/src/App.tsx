import { useEffect, useRef, useState } from 'react';
import MessageContainer from './MessagesContainer';
import TextBox from './TextBox';
import { ChatBubble, ChatPayload, JoinExitPayload, Message } from './types/message';
import SignUpForm from './SignUpForm';
import createMessage from './utils/createMessage';
import { toast, ToastContainer } from 'react-toastify';
import { Log } from './types/log';

function App() {
  const [messages, setMessages] = useState<ChatBubble[]>([]);
  const [roomId, setRoomId] = useState('1405ab34-7e8d-43d9-bcb4-3f1652ed216c');
  const [username, setUsername] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [insideRoom, setInsideRoom] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  function sendMessage() {
    const chatPayload: ChatPayload = {
      username,
      text: currentMessage,
      room: roomId,
    };
    const message: Message = createMessage('chat', chatPayload);
    wsRef.current?.send(JSON.stringify(message));
    const chatBubble: ChatBubble = { ...chatPayload, self: true };
    setMessages([...messages, chatBubble]);
    setCurrentMessage('');
  }

  function joinRoom() {
    const joinPayload: JoinExitPayload = {
      username,
      room: roomId,
    };
    const message: Message = createMessage('join', joinPayload);
    wsRef.current?.send(JSON.stringify(message));
    setCurrentMessage('');
    setMessages([]);
    setInsideRoom(true);
  }

  function exitRoom() {
    const exitPayload: JoinExitPayload = {
      username,
      room: roomId,
    };
    const message: Message = createMessage('exit', exitPayload);
    wsRef.current?.send(JSON.stringify(message));
    setCurrentMessage('');
    setMessages([]);
    setRoomId('');
    setUsername('');
    setInsideRoom(false);
  }

  if (wsRef.current) {
    wsRef.current.onmessage = (e: MessageEvent<string>) => {
      const data = JSON.parse(e.data);
      if (data.type === 'chat') {
        const chatBubble: ChatBubble = { ...data.payload, self: false };
        setMessages([...messages, chatBubble]);
      } else {
        const log: Log = data as unknown as Log;
        if (log.payload.title === 'error') {
          toast.error(JSON.stringify(log.payload.description));
        } else if (log.payload.title === 'info') {
          toast.info(JSON.stringify(log.payload.description));
        } else if (log.payload.title === 'success') {
          toast.success(JSON.stringify(log.payload.description));
        } else if (log.payload.title === 'warn') {
          toast.warn(JSON.stringify(log.payload.description));
        }
      }
    };
  }

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080');

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className='flex flex-col py-4 text-white bg-slate-900 min-h-dvh'>
      <div className='flex flex-col w-7/12 p-4 mx-auto border rounded-md'>
        {!insideRoom ? (
          <SignUpForm
            username={username}
            setUsername={setUsername}
            roomId={roomId}
            setRoomId={setRoomId}
            joinRoom={joinRoom}
          />
        ) : (
          <>
            <div className='flex justify-between'>
              <div className='text-xl text-center border-b-2 border-b-blue-700'>Room: {roomId}</div>{' '}
              <button
                onClick={exitRoom}
                className='px-2 py-1 text-blue-700 border border-blue-700 hover:text-white hover:bg-blue-700 transition-colors rounded-md'
              >
                Exit Room
              </button>
            </div>
            <MessageContainer messages={messages as ChatBubble[]} />
            <TextBox currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} sendMessage={sendMessage} />
          </>
        )}
      </div>
      <ToastContainer theme='dark' />
    </div>
  );
}

export default App;
