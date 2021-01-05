import {
	SAVE_TRACK,
	QUEUE_TRACK,
	DELETE_TRACK,
	STORE_ORIGINAL_QUEUE,
	RESTORE_QUEUE,
	REFRESH_QUEUE,
	SET_PLAYLIST,
	RESET_SAVE,
	RESET_PLAYLIST,
	SHOW_COPIED,
	HIDE_COPIED,
} from "../types";
import { omit } from "underscore";

export interface PlaylistReducerProps {
	savedTracks: object;
	queue: Array<string>;
	originalQueue: string[];
	title: string;
	owner: string;
	playlistId: string;
	unsaved: boolean;
	urlCopied: boolean;
}

const initialState: PlaylistReducerProps = {
	savedTracks: {},
	queue: [],
	originalQueue: [],
	title: "",
	owner: "",
	playlistId: "",
	unsaved: false,
	urlCopied: false,
};

export default (state = initialState, { type, payload }: { type: string; payload: [] | string }) => {
	switch (type) {
		case SET_PLAYLIST:
			return {
				...state,
				savedTracks: payload[0],
				queue: payload[1],
				title: payload[2],
				owner: payload[3],
				playlistId: payload[4],
				unsaved: false,
			};
		case SAVE_TRACK:
			return {
				...state,
				savedTracks: { ...state.savedTracks, [payload[0]]: payload[1] },
				unsaved: true,
			};
		case QUEUE_TRACK:
			return {
				...state,
				queue: [...state.queue, payload],
			};
		case REFRESH_QUEUE:
			return {
				...state,
				queue: [...payload],
			};
		case STORE_ORIGINAL_QUEUE:
			return {
				...state,
				originalQueue: [...payload],
			};
		case RESTORE_QUEUE:
			return {
				...state,
				queue: [...payload],
			};
		case DELETE_TRACK:
			if (typeof payload === "string") {
				return {
					...state,
					savedTracks: omit(state.savedTracks, payload),
					queue: state.queue.filter(id => id !== payload),
					unsaved: true,
				};
			}
			break;
		case RESET_SAVE:
			return {
				...state,
				unsaved: false,
			};
		case RESET_PLAYLIST:
			return {
				savedTracks: {},
				queue: [],
				originalQueue: [],
				title: "",
				owner: "",
				playlistId: "",
				unsaved: false,
			};
		case SHOW_COPIED:
			return {
				...state,
				urlCopied: true,
			};
		case HIDE_COPIED:
			return {
				...state,
				urlCopied: false,
			};
		default:
			return state;
	}
};
