import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    login_req: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    login_success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    clear: (state, action) => {
      state.error = null;
    },
    register_req: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    register_success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    register_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    loadUser_req: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUser_success: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loadUser_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout_success: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout_fail: (state, action) => {
      state.error = action.payload;
    },
  },
});
//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUser_req());

    const { data } = await axios.get("/api/v1/me");
    console.log(data);
    dispatch(loadUser_success(data.user));
  } catch (error) {
    dispatch(loadUser_fail(error.response.data.message));
  }
};
// register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(register_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    console.log(data);
    dispatch(register_success(data.user));
  } catch (error) {
    dispatch(register_fail(error.response.data.message));
  }
};

// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(login_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch(login_success(data.user));
  } catch (error) {
    dispatch(login_fail(error.response.data.message));
  }
};
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch(logout_success());
  } catch (error) {
    dispatch(logout_fail(error.response.data.message));
  }
};

export const clearError = () => async (dispatch) => {
  dispatch(clear());
};

export const {
  login_req,
  login_success,
  login_fail,
  clear,
  register_req,
  register_success,
  register_fail,
  loadUser_req,
  loadUser_fail,
  loadUser_success,
  logout_success,
  logout_fail,
} = userSlice.actions;
export default userSlice.reducer;
