interface PropTypes {
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

const TextBox = ({ currentMessage, setCurrentMessage, sendMessage }: PropTypes) => {
  return (
    <div className='flex items-center mx-auto gap-2'>
      <input
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        className='min-w-full px-5 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        type='text'
        placeholder='Type your message...'
      />
      <button
        onClick={sendMessage}
        type='button'
        className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200'
      >
        Send
      </button>
    </div>
  );
};

export default TextBox;
