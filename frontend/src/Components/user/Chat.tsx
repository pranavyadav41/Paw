import React, { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../../api/chat";
import { FaTimes, FaPaperclip, FaUserCircle } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaImage, FaFile } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { formatDistanceToNow } from "date-fns";
import { MdVideoCall } from "react-icons/md";
import Picker from "emoji-picker-react";
import socket from "../common/socket";
import ImageModal from "../common/ImageModal";
import { randomID } from "../../utils/randomID";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
  fileType?: "photo" | "file";
  fileName?: string;
  fileData?: string;
}

interface msg {
  sender: string;
  receiver: string;
  content: string;
  contentType: "text" | "file" | "photo";
  timestamp: Date;
}

interface ChatRoomProps {
  userId: string;
  franchiseId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ userId, franchiseId }) => {
  const [messages, setMessages] = useState<msg[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [sender] = useState<string>(userId);
  const [receiver] = useState<string>(franchiseId);
  const [showChat, setShowChat] = useState<boolean>(true);
  const [roomId] = useState<string>(`${userId}-${franchiseId}`);
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [incomingCall, setIncomingCall] = useState<{
    from: string;
    roomId: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { room: roomId });

    const fetchMessages = async () => {
      try {
        const response = await getMessages(sender, receiver); 
        setMessages(response?.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    const handleMessage = (message: msg) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("newMessage", handleMessage);

    socket.on("incomingCall", ({ from, roomId }) => {
      setIncomingCall({ from, roomId });
    });

    return () => {
      socket.off("newMessage", handleMessage);
      socket.off("incomingCall");
      socket.emit("leave", { room: roomId });
    };
  }, [sender, receiver, roomId, navigate]);

  const handleAnswerCall = () => {
    if (incomingCall) {
      const role = incomingCall.from === "user" ? "provider" : "user";
      navigate(`/videoChat?roomID=${incomingCall.roomId}&role=${role}`);
      setIncomingCall(null);
    }
  };

  const handleDeclineCall = () => {
    setIncomingCall(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageInput.trim() !== "") {
      const formData = new FormData();
      formData.append("sender", sender);
      formData.append("receiver", receiver);
      formData.append("message", messageInput);
      const newMessage: Message = {
        sender,
        receiver,
        message: messageInput,
        timestamp: new Date(),
      };
      try {
        await sendMessage(formData);
        socket.emit("sendMessage", { room: roomId, message: newMessage });
        setMessageInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setMessageInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleAttachFile = () => {
    setShowAttachmentMenu(!showAttachmentMenu);
  };

  const sendFile = async (file: File, type: "photo" | "file") => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target?.result;
      if (fileData) {
        const newMessage: Message = {
          sender,
          receiver,
          message: "",
          timestamp: new Date(),
          fileType: type,
          fileName: file.name,
          fileData: fileData as string,
        };
        const formData = new FormData();
        formData.append("sender", sender);
        formData.append("receiver", receiver);
        formData.append("message", "");
        formData.append("file", file);
        formData.append("fileType", type);
        try {
          setShowAttachmentMenu(false);
          await sendMessage(formData);
          socket.emit("sendMessage", { room: roomId, message: newMessage });
        } catch (error) {
          console.error("Error sending file:", error);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (type: "photo" | "file") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "photo" ? "image/*" : "*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        sendFile(file, type);
      }
    };
    input.click();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const initiateCall = async () => {
    const roomID = randomID(10);
    if (roomID) {
      socket.emit("initiateCall", {
        room: roomId,
        from: "user",
        roomId: roomID,
      });
      navigate(`/videoChat?roomID=${roomID}&role=user`);
    }
  };
  return (
    <>
      <div
        className={`fixed bottom-4 md:right-5 m-4 bg-[#F5F5F5] rounded-lg shadow-lg w-[374px] h-[572px] z-30 ${
          showChat ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center bg-[#9ad1aa] text-gray-600 px-4 py-2 rounded-t-lg">
          <div className="flex items-center">
            <IoMdChatbubbles className="mr-2" />
            <h3 className="text-md font-medium">Live Support</h3>
          </div>
          <div className="flex justify-center items-center gap-4">
            <MdVideoCall
              size={20}
              className="text-gray-800"
              onClick={initiateCall}
            />
            <FaTimes
              className="cursor-pointer text-gray-800"
              onClick={() => setShowChat(!showChat)}
            />
          </div>
        </div>
        <div className="p-4 h-[calc(100%-144px)] max-h-[calc(100%-144px)] overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === sender ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-flex items-start ${
                    message.sender === sender ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.sender !== sender && (
                    <FaUserCircle className="mr-2 text-gray-500" size={20} />
                  )}
                  <div
                    className={`inline-block px-4 py-2 rounded-md ${
                      message.sender === sender
                        ? "bg-gray-800 text-white text-sm font-normal rounded-xl rounded-tr-none"
                        : "bg-gray-300 text-gray-600 text-sm font-normal rounded-xl rounded-tl-none"
                    }`}
                  >
                    {message.contentType === "photo" ? (
                      <div
                        className="w-48 h-48 overflow-hidden rounded-lg shadow-md cursor-pointer"
                        onClick={() => handleImageClick(message.content)}
                      >
                        <img
                          src={message.content}
                          alt="Uploaded photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : message.contentType === "file" ? (
                      <a
                        href={message.content}
                        download
                        className="text-blue-500 underline"
                      >
                        Download File
                      </a>
                    ) : (
                      <p>{message.content}</p>
                    )}
                    <span className="block text-xs text-gray-400">
                      {formatDistanceToNow(new Date(message.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No messages to display
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 py-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full mb-2 px-4 py-3 rounded-md border text-sm font-light border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <div className="flex justify-end items-center">
            <div>
              <MdOutlineEmojiEmotions
                size={34}
                className="cursor-pointer text-gray-500 p-2 rounded-md hover:bg-gray-200"
                onClick={() => setShowPicker((val) => !val)}
              />
              {showPicker && (
                <div className="absolute bottom-12 right-2">
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <button
              onClick={handleAttachFile}
              className="text-gray-500 p-2 rounded-md hover:bg-gray-200"
            >
              <FaPaperclip size={15} />
            </button>
          </div>
          {showAttachmentMenu && (
            <div className="absolute bottom-12 right-2 bg-white rounded-md shadow-lg">
              <button
                onClick={() => handleFileSelect("photo")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <FaImage className="inline-block mr-2 text-blue-400" /> Photo
              </button>
              <button
                onClick={() => handleFileSelect("file")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <FaFile className="inline-block mr-2 text-red-400" /> File
              </button>
            </div>
          )}
        </div>
      </div>
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
      {incomingCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Incoming Call</h2>
            <p className="mb-6">
              Incoming call from {incomingCall.from}. Answer?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeclineCall}
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Decline
              </button>
              <button
                onClick={handleAnswerCall}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
