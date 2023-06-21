import { createAsyncThunk } from "@reduxjs/toolkit";
import { findNotesBySearchTerm } from "../../services/search-service";

export const findNotesBySearchTermThunk = createAsyncThunk(
  "findNotesBySearchTerm",
  (term) => findNotesBySearchTerm(term)
);