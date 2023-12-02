import axios from "axios";
import {
  buildJsonHeaderConfig,
  convertObjectToURLParams,
  extractErrorMessage,
} from "../utils";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_RESET,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  GET_SINGLE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from "./constants";

export const getUsers =
  (
    /**
     * Filter params
     */
    params = {
      keyword: null,
    },
  ) =>
  async (dispatch: any) => {
    const { keyword } = params;

    const paramsString = convertObjectToURLParams({
      keyword,
    });

    try {
      dispatch({
        type: GET_USERS_REQUEST,
      });
      const { data } = await axios.get(`/api/items?${paramsString}`);
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users: data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAIL,
        payload: extractErrorMessage(error),
      });
    }
  };
export const resetGetUsersReducer = () => async (dispatch: any) => {
  dispatch({
    type: GET_USERS_RESET,
  });
};

export const getSingleUser = (id: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_SINGLE_USER_REQUEST,
    });

    const { data } = await axios.get(`/api/items/${id}?`);

    dispatch({
      type: GET_SINGLE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_USER_FAIL,
      payload: extractErrorMessage(error),
    });
  }
};
export const resetGetSingleUserReducer = () => async (dispatch: any) => {
  dispatch({
    type: GET_SINGLE_USER_RESET,
  });
};

export const updateSingleUser =
  (id: string, updatedUser: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });

      const {
        authLogin: { loggedInUser },
      } = getState();

      const config = buildJsonHeaderConfig(loggedInUser.token);
      const { data } = await axios.put(`/api/items/${id}`, updatedUser, config);

      dispatch({
        type: UPDATE_USER_SUCCESS,
      });
      dispatch({
        type: GET_SINGLE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: extractErrorMessage(error),
      });
    }
  };
export const resetUpdateUserReducer = () => async (dispatch: any) => {
  dispatch({
    type: UPDATE_USER_RESET,
  });
};

export const createSingleUser =
  (createdUser: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: CREATE_USER_REQUEST,
      });

      const {
        authLogin: { loggedInUser },
      } = getState();
      const config = buildJsonHeaderConfig(loggedInUser.token);
      await axios.post(`/api/items/`, createdUser, config);

      dispatch({
        type: CREATE_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAIL,
        payload: extractErrorMessage(error),
      });
    }
  };
export const resetCreateUserReducer = () => async (dispatch: any) => {
  dispatch({
    type: CREATE_USER_RESET,
  });
};

export const deleteUser =
  (id: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: DELETE_USER_REQUEST,
      });

      const {
        authLogin: { loggedInUser },
      } = getState();
      const config = buildJsonHeaderConfig(loggedInUser.token);
      await axios.delete(`/api/items/${id}`, config);

      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: extractErrorMessage(error),
      });
    }
  };
export const resetDeleteUserReducer = () => async (dispatch: any) => {
  dispatch({
    type: DELETE_USER_RESET,
  });
};
