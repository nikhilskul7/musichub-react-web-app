import { createSlice } from "@reduxjs/toolkit";
import { findNotesBySearchTerm } from "../../services/search-service";
import { findNotesBySearchTermThunk } from "./search-thunks";

const initialState = {
  recipes: [],
  loading: false,
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [findNotesBySearchTermThunk.fulfilled]: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export default searchReducer.reducer;