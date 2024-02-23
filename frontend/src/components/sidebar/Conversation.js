import React from "react";
import { useConversation } from "../zustand/useConversation";
import { useSocketContext } from "../context/socketContext";

const Conversation = ({ item, emojis, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isActive = selectedConversation?._id === item?._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers?.includes(item?._id);

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedConversation(item);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-900 rounded p-2 py-1 cursor-pointer ${
          isActive ? "bg-sky-900" : ""
        }`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={item.profilePic} alt="" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{item.fullName}</p>
            <span className="text-xl"> {emojis}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
