const {
  LOGIN_REQUEST,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} = require("../constants/userConstant");

const getAuthStatusFromLocalStorage = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? JSON.parse(isAuthenticated) : false;
};

const getUserDataFromLocalStorage = () => {
  // const user = localStorage.getItem("user");
  // return user ? JSON.parse(user) : [];
};

export const userReducer = (
  state = {
    user: getUserDataFromLocalStorage(),
    isAuthenticated: getAuthStatusFromLocalStorage(),
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        //means retain authenticated states
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
