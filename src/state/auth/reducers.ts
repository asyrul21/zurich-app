import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  REMOVE_LOGIN_ERROR,
} from "./constants";

export const loginInitialState = {
  isAuthenticated: false,
  loggedInUser: null,
  loading: false,
  error: null,
};
export const authLoginReducer = (state = loginInitialState, action: any) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        loggedInUser: action.payload,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        loggedInUser: null,
        error: action.payload.error,
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        loggedInUser: null,
        loading: false,
        error: null,
      };
    case REMOVE_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
