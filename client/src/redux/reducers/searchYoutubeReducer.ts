import { LOADING_TRACKS_YT, SET_TRACKS_YT, SET_PAGE_TOKEN_YT, SET_CURRENT_TERM_YT, CLEAR_TRACKS_YT } from "../types";

export interface SearchReducerProps {
	loading: boolean;
	tracks: object[];
	pageToken: string;
	currentTerm: string;
}

const initialState: SearchReducerProps = {
	loading: false,
	tracks: [],
	pageToken: "",
	currentTerm: "",
};

export default (state = initialState, { type, payload }: { type: string; payload: [] }) => {
	switch (type) {
		case SET_TRACKS_YT:
			return {
				...state,
				tracks: [...state.tracks, ...payload],
				loading: false,
			};
		case LOADING_TRACKS_YT:
			return {
				...state,
				loading: true,
			};
		case SET_PAGE_TOKEN_YT:
			return {
				...state,
				pageToken: payload,
			};
		case SET_CURRENT_TERM_YT:
			return {
				...state,
				currentTerm: payload,
			};
		case CLEAR_TRACKS_YT:
			return {
				...state,
				tracks: [],
			};
		default:
			return state;
	}
};
