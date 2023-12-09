import axios from "axios";
import { createSliceWithThunks } from "../CustomCreateSlice";
import { IGetUsersParams, GetUsersDefaultParams } from "./constants";
import { convertObjectToURLParams, extractErrorMessage } from "../utils";

interface IUsersState {
  loading: boolean;
  error: any;
  users: any[] | null;
  pages: number | null;
  page: number;
  total: number | null;
}

const initialState: IUsersState = {
  loading: false,
  error: null,
  users: null,
  pages: null,
  page: 1,
  total: null,
};

const UserSlice = createSliceWithThunks({
  name: "User",
  initialState,
  reducers: (create) => ({
    getUsers: create.asyncThunk(
      async (params) => {
        const queryParams: IGetUsersParams = {
          ...GetUsersDefaultParams,
          ...(params || {}),
        };
        const paramsString = convertObjectToURLParams({
          ...queryParams,
        });
        const { data } = await axios.get(`/api/users?${paramsString}`);
        return {
          users: data.data,
          page: data.page,
          pages: data.total_pages,
          total: data.total,
        };
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = extractErrorMessage(action.payload ?? action.error);
        },
        fulfilled: (state, action) => {
          const { users, page, pages, total } = action.payload;
          state.loading = false;
          state.error = null;
          state.users = users;
          state.page = page;
          state.pages = pages;
          state.total = total;
        },
      },
    ),
  }),
});

export const { getUsers } = UserSlice.actions;
export default UserSlice.reducer;
