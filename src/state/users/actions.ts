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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface IGetUsersParams {
  page: number;
  per_page: number;
}

const DefaultParams: IGetUsersParams = {
  page: 1,
  per_page: 6,
};

export const getUsers = (params?: IGetUsersParams) => async (dispatch: any) => {
  const queryParams: IGetUsersParams = { ...DefaultParams, ...(params || {}) };

  const paramsString = convertObjectToURLParams({
    ...queryParams,
  });

  try {
    dispatch({
      type: GET_USERS_REQUEST,
    });
    const { data } = await axios.get(`${BASE_URL}/users?${paramsString}`);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: {
        users: data.data,
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
