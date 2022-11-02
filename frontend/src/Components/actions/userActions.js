import axios from "axios";
import { authAction } from "../slice/authSlice";
import { userAction } from "../slice/userSlice";
import { forgetAction } from "../slice/forgetSlice";
import { allUserAction } from "../slice/allUserSlice";
import { userDetailAction } from "../slice/userDetailSlice";
import { updateUserAction } from "../slice/updateUserSlice";
import { deleteUserAction } from "../slice/deleteUserSlice";
// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(authAction.login_req());
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
    dispatch(authAction.login_success(data.user));
  } catch (error) {
    dispatch(authAction.login_fail(error.response.data.message));
  }
};

// register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(authAction.register_user_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(authAction.register_user_success(data.user));
  } catch (error) {
    dispatch(authAction.register_user_fail(error.response.data.message));
  }
};
// load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(authAction.load_user_req());
    const { data } = await axios.get("/api/v1/me");
    dispatch(authAction.load_user_success(data.user));
  } catch (error) {
    dispatch(authAction.load_user_fail(error.response.data.message));
  }
};
//logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch(authAction.logout_success());
  } catch (error) {
    dispatch(authAction.logout_fail(error.response.data.message));
  }
};

// update profile

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(userAction.update_profile_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch(userAction.update_profile_success(data.success));
  } catch (error) {
    dispatch(userAction.update_profile_fail(error.response.data.message));
  }
};
//update password
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch(userAction.update_password_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/v1/password/update",
      userData,
      config
    );
    dispatch(userAction.update_password_success(data.success));
  } catch (error) {
    dispatch(userAction.update_password_fail(error.response.data.message));
  }
};
//forget password
export const forgetPassword = (userData) => async (dispatch) => {
  try {
    dispatch(forgetAction.forget_password_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/password/forget",
      userData,
      config
    );
    dispatch(forgetAction.forget_password_success(data));
  } catch (error) {
    dispatch(forgetAction.forget_password_fail(error.response.data.message));
  }
};
// reset password
//forget password
export const resetPassword = (token, userData) => async (dispatch) => {
  try {
    dispatch(forgetAction.new_password_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/password/reset/${token}`,
      userData,
      config
    );
    dispatch(forgetAction.new_password_success(data));
  } catch (error) {
    dispatch(forgetAction.new_password_fail(error.response.data.message));
  }
};
export const allUsers = () => async (dispatch) => {
  try {
    dispatch(allUserAction.all_user_req());
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch(allUserAction.all_user_success(data.users));
  } catch (error) {
    dispatch(allUserAction.all_user_fail(error.response.data.message));
  }
};
export const userDetail = (id) => async (dispatch) => {
  try {
    dispatch(userDetailAction.user_details_req());
    const { data } = await axios.get(`/api/v1/admin/users/${id}`);
    dispatch(userDetailAction.user_details_success(data.user));
  } catch (error) {
    dispatch(userDetailAction.user_details_fail(error.response.data.message));
  }
};
export const updateUser = (id, updateData) => async (dispatch) => {
  try {
    dispatch(updateUserAction.update_user_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/users/${id}`,
      updateData,
      config
    );
    dispatch(updateUserAction.update_user_success(data.success));
  } catch (error) {
    dispatch(updateUserAction.update_user_fail(error.response.data.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAction.delete_user_req());
    const { data } = await axios.delete(`/api/v1/admin/users/${id}`);
    dispatch(deleteUserAction.delete_user_success(data.success));
  } catch (error) {
    dispatch(deleteUserAction.delete_user_fail(error.response.data.message));
  }
};

export const clearError = (key) => async (dispatch) => {
  if (key === "auth") {
    dispatch(authAction.clear());
  }
  if (key === "user") {
    dispatch(userAction.clear());
  }
  if (key === "forget") {
    dispatch(forgetAction.clear());
  }
  if (key === "allUser") {
    dispatch(allUserAction.clear());
  }
  if (key === "userDetail") {
    dispatch(userDetailAction.clear());
  }
  if (key === "updateUser") {
    dispatch(updateUserAction.clear());
  }
  if (key === "deleteUser") {
    dispatch(deleteUserAction.clear());
  }
};
