import React, { useEffect, useRef } from "react";
import Message from "./Message";

import MessageSkeleton from "../loader/MessageSkeleton";
import { useGetMessages } from "../hooks/useGetMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages &&
        messages.map((message) => (
          <div key={message?._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading &&
        [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-100 mt-3 text-2xl">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
