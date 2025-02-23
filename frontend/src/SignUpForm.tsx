import * as uuid from 'uuid';

interface PropsType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  joinRoom: () => void;
}

const SignUpForm = ({ username, setUsername, roomId, setRoomId, joinRoom }: PropsType) => {
  return (
    <div className='flex flex-col items-start gap-3'>
      <div className='flex items-center justify-between gap-4 w-96'>
        <label htmlFor='username'>Username:</label>
        <input
          className='px-3 py-1 text-black border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='username'
          type='text'
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div className='flex items-center justify-between gap-4 w-96'>
        <label htmlFor='room'>Room ID:</label>
        <input
          className='px-3 py-1 text-black border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='room'
          type='text'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
      </div>
      <button
        onClick={() => {
          setRoomId(uuid.v4());
        }}
        className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200'
      >
        Generate room ID
      </button>
      <button
        onClick={joinRoom}
        className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200'
      >
        Join Room
      </button>
    </div>
  );
};

export default SignUpForm;
