import axios from "axios";
import { createSliceWithThunks } from "../CustomCreateSlice";
import { convertObjectToURLParams, extractErrorMessage } from "../utils";

interface IUsersState {
  loading: boolean;
  error: string | null;
  users: unknown[] | null;
}

const initialState: IUsersState = {
  loading: false,
  error: null,
  users: null,
};

const UserSlice = createSliceWithThunks({
  name: "User",
  initialState,
  reducers: (create) => ({
    getUsers: create.asyncThunk(
      async (params) => {
        const { data } = await axios.get(`/api/users`);
        return {
          users: data.data,
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
          const { users } = action.payload;
          state.loading = false;
          state.error = null;
          state.users = users;
        },
      },
    ),
    toggleShowEmailByUserId: create.asyncThunk(
      async (params) => {
        const { userId, showEmail } = params;
        const { data } = await axios.get(
          `/api/users/toggleShowEmail/${userId}?show=${showEmail}`,
        );
        return {
          updatedUser: data.data,
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
          const { updatedUser } = action.payload;
          state.loading = false;
          state.error = null;
          state.users =
            state.users?.map((user: any) => {
              if (user.id === updatedUser.id) {
                return { ...updatedUser };
              }
              return { ...user };
            }) || null;
        },
      },
    ),
  }),
});

export const { getUsers, toggleShowEmailByUserId } = UserSlice.actions;
export default UserSlice.reducer;
