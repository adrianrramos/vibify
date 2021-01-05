import { SET_BOOKMARKS, SET_BOOKMARKS_LOADING, ADD_BOOKMARK, DELETE_BOOKMARK } from "../types";

export interface BookmarkReducerProps {
	bookmarks: any[];
	loading: boolean;
}

const initialState: BookmarkReducerProps = {
	bookmarks: [],
	loading: false,
};

export default (state = initialState, { type, payload }: { type: string; payload: string[] }) => {
	switch (type) {
		case SET_BOOKMARKS:
			return {
				...state,
				bookmarks: [...payload],
				loading: false,
			};
		case SET_BOOKMARKS_LOADING:
			return {
				...state,
				loading: true,
			};
		case ADD_BOOKMARK:
			return {
				...state,
				bookmarks: [...state.bookmarks, payload],
				loading: false,
			};
		case DELETE_BOOKMARK:
			return {
				...state,
				bookmarks: state.bookmarks.filter(x => x.playlistId !== payload[0]),
			};
		default:
			return state;
	}
};
