import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userInformation = createAsyncThunk(
  "user/userInformation",
  async ({username, password}, { rejectWithValue }) => {
    console.log(`username from userInfo`,username)
    console.log(`password from userInfo`,password)
    try {
      const response = await axios({
        url: "http://localhost:8081/api/auth/login",
        method: "POST",
        data: { username, password },
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error
      )
      // return error;
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"))

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: user ? user.username : "",
    roles: user ? user.roles : [],
  },
  reducers: {
    // setUser: (state, action) => {
    //   console.log(`seeting username and roles inside user slice`, action);
    //   // console.log(state)
    //   return {
    //     username: action.payload.username,
    //     roles: action.payload.roles,
    //   };
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(userInformation.pending, (state) => {
      state.username = "";
    });
    builder.addCase(userInformation.rejected, (state, action) => {
      console.log(`inside prommise reject`)

    })
    builder.addCase(userInformation.fulfilled, (state, action) => {
        console.log(`inside extra reducer promise fullfilled`, action.payload)
      state.username = action.payload.data.username;
      state.roles = action.payload.data.roles;

    });
  },
});

export const { username, roles, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
