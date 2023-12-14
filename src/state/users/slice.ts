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
        const { showEmailsFor } = params;
        const paramsString = convertObjectToURLParams({
          showEmailsFor: JSON.stringify(showEmailsFor),
        });
        const { data } = await axios.get(`/api/users?${paramsString}`);
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
  }),
});

export const { getUsers } = UserSlice.actions;
export default UserSlice.reducer;
