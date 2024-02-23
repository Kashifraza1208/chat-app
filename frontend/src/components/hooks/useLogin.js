import { useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(data.user);

      localStorage.setItem("chat-user", JSON.stringify(data.user));
      setAuthUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
