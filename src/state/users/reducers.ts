import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_RESET,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_RESET,
  GET_SINGLE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_RESET,
  GET_USERS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
} from "./constants";

const getUsersInitialState = {
  loading: false,
  error: null,
  users: null,
  pages: null,
  page: 1,
};
const getUsersReducer = (state = getUsersInitialState, action: any) => {
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
        page: action.payload.page,
      };
    case GET_USERS_FAIL:
      return {
        error: action.payload,
        loading: false,
        users: null,
        pages: null,
        page: 1,
      };
    case GET_USERS_RESET:
      return {
        loading: false,
        error: null,
        users: null,
        pages: null,
        page: 1,
      };
    default:
      return state;
  }
};

const getSingleUserInitialState = {
  loading: false,
  error: null,
  user: null,
};
const getSingleUserReducer = (
  state = getSingleUserInitialState,
  action: any,
) => {
  switch (action.type) {
    case GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case GET_SINGLE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        user: null,
      };
    case GET_SINGLE_USER_RESET:
      return {
        loading: false,
        error: null,
        user: null,
      };
    default:
      return state;
  }
};

const updateSingleUserInitialState = {
  loading: false,
  error: null,
  success: null,
};
const updateSingleUserReducer = (
  state = updateSingleUserInitialState,
  action: any,
) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_USER_RESET:
      return {
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

const createSingleUserInitialState = {
  loading: false,
  error: null,
  success: null,
};
const createSingleUserReducer = (
  state = createSingleUserInitialState,
  action: any,
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CREATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CREATE_USER_RESET:
      return {
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

const deleteSingleUserInitialState = {
  loading: false,
  error: null,
  success: null,
};
const deleteSingleUserReducer = (
  state = deleteSingleUserInitialState,
  action: any,
) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_USER_RESET:
      return {
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export {
  getUsersReducer,
  getSingleUserReducer,
  createSingleUserReducer,
  updateSingleUserReducer,
  deleteSingleUserReducer,
};
