// src/lib/features/user/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  confirmed: boolean;
};

interface UserState {
  user: User | null;
}

const getInitialState = (): UserState => {
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      return { user: JSON.parse(savedUser) };
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
  }
  return { user: null };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
