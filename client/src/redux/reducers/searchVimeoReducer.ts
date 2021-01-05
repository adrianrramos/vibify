import { LOADING_TRACKS_V, SET_TRACKS_V, CLEAR_TRACKS_V, SET_CURRENT_TERM_V, SET_NEXT_PAGE_V } from "../types";

export interface SearchVimeoReducerProps {
	loading: boolean;
	tracks: object[];
	currentTerm: string;
	nextPageLink: string;
}

const initialState: SearchVimeoReducerProps = {
	loading: false,
	currentTerm: "",
	nextPageLink: "",
	tracks: [],
};

export default (state = initialState, { type, payload }: { type: string; payload: [] }) => {
	switch (type) {
		case SET_TRACKS_V:
			return {
				...state,
				tracks: [...state.tracks, ...payload],
				loading: false,
			};
		case SET_CURRENT_TERM_V:
			return {
				...state,
				currentTerm: payload,
			};
		case LOADING_TRACKS_V:
			return {
				...state,
				loading: true,
			};
		case CLEAR_TRACKS_V:
			return {
				...state,
				tracks: [],
			};
		case SET_NEXT_PAGE_V:
			return {
				...state,
				nextPageLink: payload,
			};
		default:
			return state;
	}
};
