import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../../services/event-service";
import {
  deleteEvent,
  getEventsByUserId,
  getEventsByUserIdService,
} from "../../services/event-service";
import { create } from "axios";

export const createEventThunk = createAsyncThunk(
  "createEvent",
  async (newEvent) => await service.createEvent(newEvent)
);

export const getAllEventsThunk = createAsyncThunk(
  "getAllEvents",
  async () => await service.getAllEvents()
);

export const getEventDetailsThunk = createAsyncThunk(
  "getEventDetails",
  async (eid) => await service.getEventDetails(eid)
);

export const deleteEventThunk = createAsyncThunk("deleteEvent", (mid) =>
  deleteEvent(mid)
);

export const getEventsByUserIdThunk = createAsyncThunk(
  "getEventsByUserIdThunk",
  (uid) => getEventsByUserIdService(uid)
);
