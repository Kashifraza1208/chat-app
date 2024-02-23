import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetCoversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getCoversation = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/users");
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCoversation();
  }, []);
  return { conversations, loading };
};
