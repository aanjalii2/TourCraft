import { createSlice } from "@reduxjs/toolkit";

import CookieHelper from "../../Helper/CookieHelper";

const initialState = {
  token: CookieHelper.getCookie("tour-token") || null,
  email: CookieHelper.getCookie("tour-email") || null,
  role: CookieHelper.getCookie("tour-role") || null,
  name: CookieHelper.getCookie("tour-user-name") || null,
  isAuthenticated: Boolean(CookieHelper.getCookie("tour-token")) || false,
  id: CookieHelper.getCookie("tour-user-id") || null,
  phonenumber: CookieHelper.getCookie("tour-phone-number") || null,
  nationality: CookieHelper.getCookie("tour-address") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialCredentials: (state, action) => {
      if (
        action.payload.token &&
        action.payload.email &&
        action.payload.role &&
        action.payload.name &&
        action.payload.id &&
        action.payload.phonenumber &&
        action.payload.nationality
      ) {
        CookieHelper.setCookie("tour-token", action.payload.token, 10);
        CookieHelper.setCookie("tour-email", action.payload.email, 10);
        CookieHelper.setCookie("tour-role", action.payload.role, 10);
        CookieHelper.setCookie("tour-user-name", action.payload.name, 10);
        CookieHelper.setCookie("tour-user-id", action.payload.id, 10);
        CookieHelper.setCookie("tour-phone-number", action.payload.phonenumber, 10);
        CookieHelper.setCookie("tour-address", action.payload.nationality, 10);

        state.token = action.payload.token;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.name = action.payload.name;
        state.id = action.payload.id;
        state.phonenumber = action.payload.phonenumber;
        state.nationality = action.payload.nationality;
        state.isAuthenticated = true;
      }
    },

    setNewToken: (state, action) => {
      if (action.payload.token) {
        CookieHelper.setCookie("tour-token", action.payload.token, 10);
        state.token = action.payload.token;
        state.isAuthenticated = true;
      }
    },

    logout: (state) => {
      CookieHelper.deleteCookie("tour-token");
      CookieHelper.deleteCookie("tour-email");
      CookieHelper.deleteCookie("tour-role");
      CookieHelper.deleteCookie("tour-user-name");
      CookieHelper.deleteCookie("tour-user-id");
      CookieHelper.deleteCookie("tour-phone-number");
      CookieHelper.deleteCookie("tour-address");

      state.token = null;
      state.email = null;
      state.role = null;
      state.name = null;
      state.isAuthenticated = false;
      state.id = null;
      state.phonenumber = null;
      state.nationality = null;
    },
  },
});

export const { setInitialCredentials, setNewToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectEmail = (state) => state.auth.email;
export const selectRole = (state) => state.auth.role;
export const selectUserName = (state) => state.auth.name;
export const selectUserId = (state) => state.auth.id;
export const selectphonenumber = (state) => state.auth.phonenumber;
export const selectnationality = (state) => state.auth.nationality;
