import { createSlice } from "@reduxjs/toolkit";

interface Form {
  userInput: string;
  selectedPlatforms: string[];
}

const initialState: Form = {
  userInput: "",
  selectedPlatforms: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    handleForm: (state, action) => {
      const { userInput, selectedPlatforms } = action.payload;
      state.userInput = userInput;
      state.selectedPlatforms = selectedPlatforms;
    },
    togglePlatform: (state, action) => {
      const platform = action.payload;
      if (state.selectedPlatforms.includes(platform)) {
        state.selectedPlatforms = state.selectedPlatforms.filter(
          (p) => p !== platform
        );
      } else {
        state.selectedPlatforms.push(platform);
      }
    },
  },
});

export const { handleForm, togglePlatform } = formSlice.actions;

export default formSlice;
