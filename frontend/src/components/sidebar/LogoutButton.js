import React from "react";

import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  const handleLogoutButton = async () => {
    await logout();
    toast.success("Logout Successfully");
  };

  return (
    <div className="mt-auto">
      <div className="tooltip " data-tip="LogOut">
        <button className="btn px-0 pe-1 py-0 btn-primary">
          <BiLogOut
            className="w-6 h-6 text-white cursor-pointer"
            onClick={handleLogoutButton}
          />
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
