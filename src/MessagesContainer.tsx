import { createRef, useEffect } from 'react';
import { ChatBubble } from './types/message';

interface PropTypes {
  messages: ChatBubble[];
}

const MessageContainer = ({ messages }: PropTypes) => {
  const messageContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    messageContainerRef.current?.scroll({ top: messageContainerRef.current.scrollHeight });
  }, [messageContainerRef]);

  return (
    <div ref={messageContainerRef} className='p-4 overflow-y-scroll border m-4 h-[80vh] space-y-4'>
      {messages &&
        messages.map((message: ChatBubble, i: number) => {
          return (
            <div className={`flex items-center gap-3 w-full ${message.self ? 'flex-row-reverse' : ''}`} key={i}>
              <img
                className='rounded-full size-8'
                src={`https://ui-avatars.com/api/?name=${message.username}&background=bc0d33&color=fff`}
                alt='Profile'
              />
              <div className='px-2 py-1 text-black bg-white w-max rounded-md'>{message.text}</div>
            </div>
          );
        })}
    </div>
  );
};

export default MessageContainer;
