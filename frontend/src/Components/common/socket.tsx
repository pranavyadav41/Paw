// socket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_CHAT_URL);

export default socket;  