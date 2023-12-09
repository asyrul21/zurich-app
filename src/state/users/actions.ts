import axios from "axios";
import { convertObjectToURLParams, extractErrorMessage } from "../utils";
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_RESET,
} from "./constants";

export interface IGetUsersParams {
  page: number;
  per_page: number;
  maskEmail: boolean;
}

const DefaultParams: IGetUsersParams = {
  page: 1,
  per_page: 6,
  maskEmail: false,
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

    const { data } = await axios.get(`/api/users?${paramsString}`);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: {
        users: data.data,
        pages: data.total_pages,
        total: data.total,
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
