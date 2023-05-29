import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedInUser: null,
    loading: true,
    error: null,
    userDetails: {},
    usersList: [],
    userDeletedAndReload: false
  },
  reducers: {
    loginUserStart(state) {
      state.loading = true;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.loggedInUser = action.payload;
    },
    loginUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.loading = false;
      state.error = null;
      state.loggedInUser = null;
    },
    registerUserStart(state) {
      state.loading = true;
    },
    registerUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserDetailsStart(state) {
      state.loading = true;
    },
    getUserDetailsSuccess(state, action) {
      state.loading = false;
      state.userDetails = action.payload;
    },
    getUserDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserDetailsStart(state) {
      state.loading = true;
    },
    updateUserDetailsSuccess(state, action) {
      const { data, loggedInUser } = action.payload;
      state.loading = false;
      state.userDetails = data;
      state.loggedInUser = loggedInUser;
    },
    updateUserDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loadAllUsersStart(state) {
      state.loading = true;
    },
    loadAllUsersSuccess(state, action) {
      state.loading = false;
      state.usersList = action.payload;
      state.userDeletedAndReload = false;
    },
    loadAllUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeUserStart(state) {
      state.loading = true;
    },
    removeUserSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.userDeletedAndReload = true;
    },
    removeUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.userDeletedAndReload = false;
    }
  }
});


export default userSlice.reducer;

export const { 
  loginUserStart,
  loginUserSuccess,
  loginUserFail,
  logoutUser,
  registerUserStart,
  registerUserFail,
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsFail,
  updateUserDetailsStart,
  updateUserDetailsSuccess,
  updateUserDetailsFail,
  loadAllUsersStart,
  loadAllUsersSuccess,
  loadAllUsersFail,
  removeUserStart,
  removeUserSuccess,
  removeUserFail
} = userSlice.actions;