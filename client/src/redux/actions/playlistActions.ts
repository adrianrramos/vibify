import {
    SAVE_TRACK,
    QUEUE_TRACK,
    DELETE_TRACK,
    DELETE_BOOKMARK,
    RESET_SAVE,
    RESET_PLAYLIST,
    SET_PLAYLIST,
} from "../types";
import { TrackDataProps } from "../../components/SearchResults/Card";
import { Dispatch } from "redux";
import axios from "axios";

export const saveNewTrack = (track: TrackDataProps) => (disptach: any) => {
    disptach({ type: SAVE_TRACK, payload: [track.id, track] });

    disptach({ type: QUEUE_TRACK, payload: track.id });
};

export const deleteTrack = (id: string) => (dispatch: any) => {
    dispatch({ type: DELETE_TRACK, payload: id });
};

export const savePlaylist = (playlistId: string, tracks: {}, queue: string[]) => async (dispatch: Dispatch) => {
    try {
        await axios.post(`/playlist/${playlistId}/tracks`, {
            tracks,
            queue,
        });

        dispatch({ type: RESET_SAVE });
    } catch (err) {
        console.error(err);
    }
};

export const editPlaylistTitle = (playlistId: string, title: string) => async (dispatch: Dispatch) => {};

export const deletePlaylist = (playlistId: string) => async (dispatch: Dispatch) => {
    try {
        // delete the playlist
        dispatch({ type: DELETE_BOOKMARK, payload: [playlistId] });
        dispatch({ type: RESET_PLAYLIST });
        dispatch({ type: RESET_SAVE });
        await axios.delete(`/playlist/${playlistId}`);
    } catch (err) {
        console.error(err);
    }
};

export const getPlaylist = (playlistId: string) => async (dispatch: Dispatch) => {
    try {
        const { data } = await axios.get(`/playlist/${playlistId}`);
        dispatch({
            type: SET_PLAYLIST,
            payload: [data.tracks, data.queue, data.title, data.owner, data.playlistId],
        });
    } catch (err) {
        console.error(err);
    }
};
