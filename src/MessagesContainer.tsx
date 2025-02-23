import { createRef, useEffect, useRef } from 'react';
import { ChatBubble } from './types/message';
import generateColor from './utils/generateColor';

interface PropTypes {
  messages: ChatBubble[];
}

const MessageContainer = ({ messages }: PropTypes) => {
  const messageContainerRef = createRef<HTMLDivElement>();
  const colorsMapRef = useRef<Map<string, string>>(null);

  useEffect(() => {
    messageContainerRef.current?.scroll({ top: messageContainerRef.current.scrollHeight });
  }, [messageContainerRef]);

  return (
    <div ref={messageContainerRef} className='p-4 overflow-y-scroll border m-4 h-[80vh] space-y-4'>
      {messages &&
        messages.map((message: ChatBubble, i: number) => {
          let userColor;
          const colorsMap = colorsMapRef?.current;
          if (colorsMap?.get(message.username)) {
            userColor = colorsMap?.get(message.username);
          } else {
            userColor = generateColor();
            colorsMap?.set(message.username, userColor);
          }
          return (
            <div className={`flex items-center gap-3 w-full ${message.self ? 'flex-row-reverse' : ''}`} key={i}>
              <img
                className='rounded-full size-8'
                src={`https://ui-avatars.com/api/?name=${message.username}&background=${userColor}&color=fff`}
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
