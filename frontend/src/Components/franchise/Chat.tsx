import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { getMessages, sendMessage } from "../../api/chat";
import { FaTimes, FaPaperclip, FaUserCircle } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { ImExit, ImAttachment } from "react-icons/im";
import { format } from "date-fns";
import socket from "../socket";

interface Message {
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

interface ChatRoomProps { 
  userId: string;
  franchiseId: string;
  name:string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ userId, franchiseId,name}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [sender, setSender] = useState<string>(franchiseId);
  const [receiver, setReceiver] = useState<string>(userId);
  const [showChat, setShowChat] = useState<boolean>(true);
  const [roomId, setRoomId] = useState<string>(`${userId}-${franchiseId}`);
  const messagesEndRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    // Join the room
    socket.emit("join", { room: roomId });

    // Fetch existing messages from the server
    const fetchMessages = async () => {
      try {
        const response = await getMessages(sender, receiver);
        setMessages(response?.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    // Listen for new messages from the server
    const handleMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
      socket.emit("leave", { room: roomId });
    };
  }, [sender, receiver, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageInput.trim() !== "") {
      const newMessage: Message = {
        sender,
        receiver,
        message: messageInput,
        timestamp: new Date(),
      };
      try {
        // Send the message to the server
        await sendMessage(sender, receiver, messageInput);
        socket.emit("sendMessage", { room: roomId, message: newMessage });
        setMessageInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleEndChat = () => {
    // Add your logic for ending the chat here
  };

  const handleAttachFile = () => {
    // Add your logic for attaching files here
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div
      className={` bottom-4 md:right-5 m-4 bg-[#F5F5F5]  shadow-lg w-full h-full z-30 ${
        showChat ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center px-4 py-2 bg-[#3968B6] text-white rounded-t-lg">
        <FaUserCircle className="mr-2" size={20} />
        <span className="font-semibold">{name}</span>
      </div>
      <div className="p-4 h-[calc(100%-144px)] max-h-[calc(100%-144px)] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === sender ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-flex items-start  ${
                message.sender === sender ? "flex-row-reverse" : ""
              }`}
            >
              {message.sender !== sender && (
                <FaUserCircle className="mr-2 text-gray-500" size={20} />
              )}
              <div
                className={`inline-block px-3 py-2 rounded-md ${
                  message.sender === sender
                    ? "inline-block px-4 py-2 bg-gray-800 text-white text-sm font-normal rounded-xl rounded-tr-none "
                    : "bg-gray-300 text-gray-600 text-sm font-normal rounded-xl rounded-tl-none"
                }`}
              >
                <p>{message.message}</p>
                <span className="block text-xs text-gray-500 mt-1">
                  {format(new Date(message.timestamp), "hh:mm a")}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex px-4 py-2 bg-white mt-12">
        <div className="flex-grow">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full px-4 py-2 rounded-md border text-sm font-light border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <button
          onClick={handleAttachFile}
          className="ml-2 text-gray-500 p-2 rounded-md hover:bg-gray-200"
        >
          <ImAttachment size={15} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;