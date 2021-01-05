import { SET_CURRENT_TRACK, CLEAR_PLAYER_QUEUE, SET_PLAYER_QUEUE } from "../types";

export const setCurrentTrack = (url: string, title: string) => (dispatch: any) => {
  dispatch(clearPlayerQueue());
  dispatch({ type: SET_CURRENT_TRACK, payload: [url, title] });
};

export const setCurrentTrackFromPlaylist = (
  url: string,
  title: string,
  id: string,
  queue: string[]
) => (dispatch: any) => {
  dispatch(clearPlayerQueue());
  dispatch({ type: SET_CURRENT_TRACK, payload: [url, title, id] });
  dispatch({ type: SET_PLAYER_QUEUE, payload: queue });
};

const clearPlayerQueue = () => (dispatch: any) => {
  dispatch({ type: CLEAR_PLAYER_QUEUE });
};
