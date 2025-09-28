import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  suggestions: { [key: string]: string[] };
}

const initialState: SearchState = {
  suggestions: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSuggestions: (state, action) => {
      const { query, suggestions } = action.payload;
      state.suggestions[query] = suggestions;
    },
  },
});

export const { setSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
