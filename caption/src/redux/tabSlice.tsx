import { createSlice } from "@reduxjs/toolkit";

interface Tab {
  tab:string;
}

const initialState: Tab = {
  tab: "home",
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    handleTabHome: (state) => {
      state.tab = "home";
    },
    handleTabCaption: (state) => {
      state.tab = "caption";
    },
  },
});

export const tabAction = tabSlice.actions;

export default tabSlice;
