import { LOADING_TRACKS_SC, SET_TRACKS_SC, CLEAR_TRACKS_SC, SET_CURRENT_TERM_SC, SET_NEXT_PAGE_SC } from "../types";

export interface SearchSoundcloudReducerProps {
	loading: boolean;
	tracks: object[];
	currentTerm: string;
	nextPageLink: string;
}

const initialState: SearchSoundcloudReducerProps = {
	loading: false,
	currentTerm: "",
	nextPageLink: "",
	tracks: [],
};

export default (state = initialState, { type, payload }: { type: string; payload: [] }) => {
	switch (type) {
		case SET_TRACKS_SC:
			return {
				...state,
				tracks: [...state.tracks, ...payload],
				loading: false,
			};
		case SET_CURRENT_TERM_SC:
			return {
				...state,
				currentTerm: payload,
			};
		case SET_NEXT_PAGE_SC:
			return {
				...state,
				nextPageLink: payload,
			};
		case LOADING_TRACKS_SC:
			return {
				...state,
				loading: true,
			};
		case CLEAR_TRACKS_SC:
			return {
				...state,
				tracks: [],
			};
		default:
			return state;
	}
};
