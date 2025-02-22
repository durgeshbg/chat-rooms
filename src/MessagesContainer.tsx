import { createRef, useEffect } from 'react';
import { Message } from './types';

interface PropTypes {
  messages: Message[];
}

const MessageContainer = ({ messages }: PropTypes) => {
  const messageContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    messageContainerRef.current?.scroll({ top: messageContainerRef.current.scrollHeight });
  }, [messageContainerRef]);

  return (
    <div ref={messageContainerRef} className='p-4 overflow-y-scroll border m-4 space-y-4'>
      {messages &&
        messages.map((msg: Message, i: number) => (
          <div className='flex items-center gap-3' key={i}>
            <img
              className='rounded-full size-8'
              src={`https://ui-avatars.com/api/?name=${msg.payload.username}&background=bc0d33&color=fff`}
              alt='Profile'
            />
            <div className='bg-white text-black w-max px-2 py-1 rounded-md'>{msg.payload.text}</div>
          </div>
        ))}
    </div>
  );
};

export default MessageContainer;
