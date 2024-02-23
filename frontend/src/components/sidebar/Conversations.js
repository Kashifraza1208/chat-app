import React from "react";
import Conversation from "./Conversation";

import { getRandomEmoji } from "../../utils/emojis";
import { useGetCoversation } from "../hooks/useGetConversation";

const Conversations = () => {
  const { conversations } = useGetCoversation();


  return (
    <div className="flex flex-col py-2 overflow-auto">
      {conversations &&
        conversations.map((item, index) => (
          <Conversation
            key={item._id}
            item={item}
            emojis={getRandomEmoji()}
            lastIndex={index === item.length - 1}
          />
        ))}
    </div>
  );
};

export default Conversations;
