import React from "react";

import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();

  const handleLogoutButton = async () => {
    await logout();
    toast.success("Logout Successfully");
  };

  return (
    <div className="mt-auto">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button onClick={() => document.getElementById("my_modal_5").showModal()}>
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={authUser.profilePic} />
          </div>
        </div>
      </button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle mb-0 w-80 p-0"
        onClick={() => document.getElementById("my_modal_5").close()}
      >
        <div className="modal-box mt-64 ">
          <div className="avatar mb-4">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={authUser.profilePic} />
            </div>
          </div>
          <div className="flex items-center">
            <h3 className="font-bold text-lg mb-0">Full Name : </h3>
            <h3 className="mb-0 ps-1">{authUser.fullName}</h3>
          </div>
          <div className="flex items-center">
            <h3 className="font-bold text-lg mb-0">Username : </h3>
            <h3 className="mb-0 ps-1">{authUser.username}</h3>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-primary py-0"
                onClick={handleLogoutButton}
              >
                {" "}
                Logout
                {/* <BiLogOut className="w-6 h-6 text-white cursor-pointer" /> */}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LogoutButton;
