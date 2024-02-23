import React from "react";

const Loader = () => {
  return (
    <div className="bg-inherit flex items-center justify-center flex-col text-white text-3xl">
      <div className="w-40  h-40 border-t-4 border-b-zinc-100 rounded-full animate-spin mb-2"></div>
      Please wait...
    </div>
  );
};

export default Loader;
