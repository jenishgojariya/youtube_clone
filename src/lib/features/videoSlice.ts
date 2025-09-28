import { VideoInfo } from "@/components/Main/VideoCard";
import { YOUTUBE_VIDEOS_API, YOUTUBE_SEARCH_API } from "@/constants/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface VideoState {
  ytVideos: VideoInfo[];
  loading: boolean;
  error: string;
  nextPageToken: string | null;
}

const initialState: VideoState = {
  ytVideos: [],
  loading: false,
  error: "",
  nextPageToken: null,
};

export const getVideos = createAsyncThunk(
  "yt/fetchVideos",
  async (params?: { pageToken?: string; searchQuery?: string }) => {
    const { pageToken, searchQuery } = params || {};

    let apiUrl = searchQuery
      ? `${YOUTUBE_SEARCH_API}&q=${encodeURIComponent(searchQuery)}`
      : YOUTUBE_VIDEOS_API;

    if (pageToken) {
      apiUrl += `&pageToken=${pageToken}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      videos: data.items,
      nextPageToken: data.nextPageToken || null,
      pageToken: pageToken || null,
    };
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.ytVideos = [];
      state.nextPageToken = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.pageToken) {
          state.ytVideos = [...state.ytVideos, ...action.payload.videos];
        } else {
          state.ytVideos = action.payload.videos;
        }

        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load videos";
      });
  },
});

export const { clearVideos } = videoSlice.actions;
export default videoSlice.reducer;
