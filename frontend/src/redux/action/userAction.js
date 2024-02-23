import axios from "axios";
import toast from "react-hot-toast";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/userConstant";

const setAuthStatusInLocalStorage = (status, userData) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
  localStorage.setItem("user", JSON.stringify(userData));
};

const handleInputError = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};

const handleLoginError = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
};

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    const success = handleLoginError({ username, password });
    if (!success) return false;

    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/auth/login",
        { username, password },
        config
      );
      console.log(data);
      setAuthStatusInLocalStorage(true, data.user);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const SignUpUser =
  ({ fullName, username, password, confirmPassword, gender }) =>
  async (dispatch) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
      });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "/api/auth/signup",
        { fullName, username, password, confirmPassword, gender },
        config
      );

      setAuthStatusInLocalStorage(true, data.user);

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/auth/logout");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    setAuthStatusInLocalStorage(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
