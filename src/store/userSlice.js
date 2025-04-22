import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, displayName, email, photoURL } = action.payload;
      state.uid = uid;
      state.displayName = displayName;
      state.email = email;
      state.photoURL = photoURL;
      state.isAuthChecked = true;
    },
    logoutUser: (state) => {
      state.uid = null;
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
