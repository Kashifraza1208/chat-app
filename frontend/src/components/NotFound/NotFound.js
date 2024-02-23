import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center m-auto items-center h/2-screen ">
      <h1 className="font-bold text-white text-6xl mb-4"> page not found!😔</h1>
      <div className="bg-red-500 text-white font-bold text-4xl p-2 rounded-lg">
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default NotFound;
