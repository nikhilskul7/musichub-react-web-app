import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReview,
  deleteReviewService,
  findReviewsByHost,
  findReviewsByFood,
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

export const findReviewsByFoodThunk = createAsyncThunk(
  "findReviewsByFoodThunk",
  async (idMeal) => findReviewsByFood(idMeal)
);

export const findReviewsByHostThunk = createAsyncThunk(
  "findReviewsByHostThunk",
  async (host) => findReviewsByHost(host)
);

export const deleteReviewThunk = createAsyncThunk(
  "deleteReviewCommentThunk",
  async (reviewID) => deleteReviewService(reviewID)
);