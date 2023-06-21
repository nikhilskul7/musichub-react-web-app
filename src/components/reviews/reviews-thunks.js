import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReview,
  deleteReviewService,
  findReviewsByHost,
  findReviewsByNotes,
  updateReviewService,
} from "../../services/reviews-service";

export const createReviewThunk = createAsyncThunk(
  "createReviewThunk",
  async (review) => createReview(review)
);

export const updateReviewThunk = createAsyncThunk(
  "updateReviewThunk",
  async (comment) => updateReviewService(comment)
);

export const findReviewsByNotesThunk = createAsyncThunk(
  "findReviewsByNotesThunk",
  async (idSong) => findReviewsByNotes(idSong)
);

export const findReviewsByHostThunk = createAsyncThunk(
  "findReviewsByHostThunk",
  async (host) => findReviewsByHost(host)
);

export const deleteReviewThunk = createAsyncThunk(
  "deleteReviewCommentThunk",
  async (reviewID) => deleteReviewService(reviewID)
);