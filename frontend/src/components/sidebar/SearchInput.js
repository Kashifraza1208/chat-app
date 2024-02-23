import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useGetCoversation } from "../hooks/useGetConversation";
import toast from "react-hot-toast";
import { useConversation } from "../zustand/useConversation";

const SearchInput = () => {
  const { conversations } = useGetCoversation();
  const [searchValue, setSearchValue] = useState("");
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) return;
    if (searchValue.length < 3) {
      toast.error("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearchValue("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form
      className="flex justify-between  items-center gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        className="input input-bordered md:w-[315px] bg-black text-white rounded-full"
      />
      <button
        type="submit"
        className="btn btn-circle bg-sky-500 hover:bg-black outline-none border-0 text-white"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
