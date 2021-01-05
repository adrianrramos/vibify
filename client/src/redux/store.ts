import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Reducers
import searchYoutubeReducer, { SearchReducerProps } from "./reducers/searchYoutubeReducer";
import searchSoundcloudReducer, { SearchSoundcloudReducerProps } from "./reducers/searchSouncloudReducer.ts";
import searchVimeoReducer, { SearchVimeoReducerProps } from "./reducers/searchVimeoReducer";
import playerReducer, { PlayerReducerProps } from "./reducers/playerReducer";
import playlistReducer, { PlaylistReducerProps } from "./reducers/playlistReducer";
import modeReducer from "./reducers/modeReducer";
import bookmarkReducer, { BookmarkReducerProps } from "./reducers/bookmarkReducer";
import userReducer, { UserReducerProps } from "./reducers/userReducer";

const rootReducer = combineReducers({
	searchYoutube: searchYoutubeReducer,
	searchSoundcloud: searchSoundcloudReducer,
	searchVimeo: searchVimeoReducer,
	player: playerReducer,
	playlist: playlistReducer,
	userBookmarks: bookmarkReducer,
	mode: modeReducer,
	user: userReducer,
});

export interface RootState {
	searchYoutube: SearchReducerProps;
	searchSoundcloud: SearchSoundcloudReducerProps;
	searchVimeo: SearchVimeoReducerProps;
	player: PlayerReducerProps;
	playlist: PlaylistReducerProps;
	userBookmarks: BookmarkReducerProps;
	mode: string;
	user: UserReducerProps;
}

const initialState = {};

const middleware = [thunk];

// Get redux dev tools working => explicitly
// set a new property on `window` in TypeScript
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(...middleware)));

export default store;
