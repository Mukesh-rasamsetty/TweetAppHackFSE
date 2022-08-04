import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingAccounts: null,
  followerAccounts: null,
};





export const getAllAccounts = createAsyncThunk(
  "http://localhost:8090/api/v1.0/tweets/users/all",
  async (thunkAPI) => {
    const response = await axios({
      method: "get",
      url: "http://localhost:8090/api/v1.0/tweets/users/all",
    });
    return response.data;
  }
);
export const getAccountsByUser = createAsyncThunk(
  "http://localhost:8090/api/v1.0/tweets/user/search/",
  async ({username},thunkAPI) => {
    const response = await axios({
      method: "get",
      url: "http://localhost:8090/api/v1.0/tweets/user/search/"+username,
    });
    return response.data;
  }
);


export const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.followerAccounts = action.payload;
    });
    builder.addCase(getAccountsByUser.fulfilled, (state, action) => {
      state.followerAccounts = action.payload;
    });
  },
});

export default AccountSlice.reducer;
