import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_RESET,
  GET_USERS_SUCCESS,
} from "./constants";

const getUsersInitialState = {
  loading: false,
  error: null,
  users: null,
  pages: null,
  page: 1,
  total: null,
};
export const getUsersReducer = (state = getUsersInitialState, action: any) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        error: null,
        loading: false,
        users: action.payload.users,
        pages: action.payload.pages,
        total: action.payload.total,
        page: action.payload.page,
      };
    case GET_USERS_FAIL:
      return {
        error: action.payload,
        loading: false,
        users: null,
        pages: null,
        total: null,
        page: 1,
      };
    case GET_USERS_RESET:
      return {
        loading: false,
        error: null,
        users: null,
        pages: null,
        total: null,
        page: 1,
      };
    default:
      return state;
  }
};
