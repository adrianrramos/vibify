import axios from "axios";
import { Dispatch } from "redux";
import {
  SET_TRACKS_YT,
  SET_PAGE_TOKEN_YT,
  SET_CURRENT_TERM_YT,
  LOADING_TRACKS_YT,
  CLEAR_TRACKS_YT,
  LOADING_TRACKS_SC,
  CLEAR_TRACKS_SC,
  SET_TRACKS_SC,
  SET_CURRENT_TERM_SC,
  SET_NEXT_PAGE_SC,
  LOADING_TRACKS_V,
  CLEAR_TRACKS_V,
  SET_CURRENT_TERM_V,
  SET_TRACKS_V,
  SET_NEXT_PAGE_V,
} from "../types";

// SEARCH YOUTUBE ACTIONS
/**
 * Runs a search Query on the Youtube Data API v3.
 * Quota Limit of 10,000 units per day, go to google docs for more information.
 * https://developers.google.com/youtube/v3
 */
export const searchYoutube = (term: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_TRACKS_YT });
  dispatch({ type: CLEAR_TRACKS_YT });
  dispatch({ type: SET_CURRENT_TERM_YT, payload: term });

  try {
    const { data } = await axios.get(`/youtube`, { params: { term } });
    const newPageToken = data.pop();

    dispatch({ type: SET_PAGE_TOKEN_YT, payload: newPageToken });
    dispatch({ type: SET_TRACKS_YT, payload: data });
  } catch (err) {
    console.log(Object.keys(err), err.message);
  }
};

export const loadMoreResults = (term: string, pageToken: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_TRACKS_YT });

  try {
    const { data } = await axios.get("/youtube/more", { params: { term, pageToken } });
    const newPageToken = data.pop();

    dispatch({ type: SET_PAGE_TOKEN_YT, payload: newPageToken });
    dispatch({ type: SET_TRACKS_YT, payload: data });
  } catch (err) {
    console.log(Object.keys(err), err.message);
  }
};

// SEARCH SOUNDCLOUD ACTIONS
export const searchSoundCloud = (term: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_TRACKS_SC });
  dispatch({ type: CLEAR_TRACKS_SC });
  dispatch({ type: SET_CURRENT_TERM_SC, payload: term });

  try {
    const { data } = await axios.get("/soundcloud", { params: { term } });
    const next_href = data.pop();

    dispatch({ type: SET_NEXT_PAGE_SC, payload: next_href });
    dispatch({ type: SET_TRACKS_SC, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const loadMoreSoundcloudResults = (nextPageLink: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_TRACKS_SC });

  try {
    const { data } = await axios.get("/soundcloud/more", { params: { nextPageLink } });
    const next_href = data.pop();

    dispatch({ type: SET_NEXT_PAGE_SC, payload: next_href });
    dispatch({ type: SET_TRACKS_SC, payload: data });
  } catch (err) {
    console.error(err);
  }
};

// SEARCH VIMEO ACTIONS
export const searchVimeo = (term: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_TRACKS_V });
  dispatch({ type: CLEAR_TRACKS_V });
  dispatch({ type: SET_CURRENT_TERM_V, payload: term });

  try {
    const { data } = await axios.get("/vimeo", { params: { term } });
    const next = data.pop();

    dispatch({ type: SET_NEXT_PAGE_V, payload: next });
    dispatch({ type: SET_TRACKS_V, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const loadMoreVimeoResults = (nextPageLink: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOADING_TRACKS_V });

  try {
    const { data } = await axios.get("/vimeo/more", { params: { nextPageLink: `${nextPageLink}` } });
    const next = data.pop();

    dispatch({ type: SET_NEXT_PAGE_V, payload: next });
    dispatch({ type: SET_TRACKS_V, payload: data });
  } catch (err) {
    console.error(err);
  }
};
