import React from "react";
import { useSelector } from "react-redux";
import { useConversation } from "../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.user);
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === user?._id; //means check authenticated user
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div
        className={`chat-footer opacity-50 text-xs text-gray-300 flex gap-1 items-center`}
      >
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
