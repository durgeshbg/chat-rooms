import * as uuid from 'uuid';

interface PropsType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
}

const SignUpForm = ({ username, setUsername, roomId, setRoomId }: PropsType) => {
  return (
    <div className='flex flex-col gap-3 items-start'>
      <div className='flex items-center justify-between gap-4 w-96'>
        <label htmlFor='username'>Username:</label>
        <input
          className='px-3 py-1 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          id='username'
          type='text'
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div className='flex items-center justify-between gap-4 w-96'>
        <label htmlFor='room'>Room ID:</label>
        <input
          className='px-3 py-1 border border-gray-300 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
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
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'
      >
        Generate room ID
      </button>
      <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200'>
        Join Room
      </button>
    </div>
  );
};

export default SignUpForm;
