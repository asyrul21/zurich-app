import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
