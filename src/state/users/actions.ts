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
