import {
	SET_CURRENT_TRACK,
	SET_PLAYER_QUEUE,
	CLEAR_PLAYER_QUEUE,
	SET_BUFFERING,
	CLEAR_BUFFERING,
	CLEAR_CURRENT_TRACK,
} from "../types";

export interface PlayerReducerProps {
	currentTrack: string[];
	playerQueue: string[];
	buffering: boolean;
}

const initialState: PlayerReducerProps = {
	currentTrack: [],
	playerQueue: [],
	buffering: false,
};

export default (state = initialState, { type, payload }: { type: string; payload?: [] }) => {
	switch (type) {
		case SET_CURRENT_TRACK:
			return {
				...state,
				currentTrack: payload,
			};
		case CLEAR_CURRENT_TRACK:
			return {
				...state,
				currentTrack: [],
			};
		case SET_PLAYER_QUEUE:
			return {
				...state,
				playerQueue: payload,
			};
		case CLEAR_PLAYER_QUEUE:
			return {
				...state,
				playerQueue: [],
			};
		case SET_BUFFERING:
			return {
				...state,
				buffering: true,
			};
		case CLEAR_BUFFERING:
			return {
				...state,
				buffering: false,
			};
		default:
			return state;
	}
};
