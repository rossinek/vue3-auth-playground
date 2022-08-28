import { defineStore } from "pinia";

import * as authApi from "@/api/auth";
import { removeAuthHeader, setAuthHeader } from "@/api/client";

const TOKEN_STORAGE_KEY = "auth-token";
const USER_STORAGE_KEY = "user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    authToken: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.authToken,
  },
  actions: {
    setUserData({ authToken, user }) {
      this.authToken = authToken;
      this.userData = user;
      localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    },
    resetUserData() {
      this.authToken = null;
      this.userData = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    },
    restoreUserData() {
      try {
        const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || null);
        if (authToken && user) {
          setAuthHeader(`Bearer ${authToken}`);
          this.setUserData({ authToken, user });
        }
      } catch (error) {
        console.error(error);
        // clear invalid data from storage
        this.resetUserData();
      }
    },
    async login(credentials) {
      if (this.isLoggedIn) await this.logout();
      const response = await authApi.login(credentials);
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      setAuthHeader(authHeader);
      this.setUserData({ authToken, user: response.data });
    },
    async register(credentials) {
      if (this.isLoggedIn) await this.logout();
      const response = await authApi.register(credentials);
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      setAuthHeader(authHeader);
      this.setUserData({ authToken, user: response.data });
    },
    async logout() {
      if (!this.isLoggedIn) return;
      // TODO: logout from API
      this.resetUserData();
      removeAuthHeader();
    },
  },
});
