interface PropTypes {
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

const TextBox = ({ currentMessage, setCurrentMessage, sendMessage }: PropTypes) => {
  return (
    <div className='flex items-center gap-2 mx-auto'>
      <input
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        className='px-5 py-2 border min-w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
        type='text'
        placeholder='Type your message...'
      />
      <button
        onClick={sendMessage}
        type='button'
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'
      >
        Send
      </button>
    </div>
  );
};

export default TextBox;
