import React from "react";
import { Router, Route } from "react-router";
import history from "./util/history";
import axios from "axios";
import jwt_decode from "jwt-decode";
import store from "./redux/store";
import { connect } from "react-redux";
import { getPlaylist } from "./redux/actions/playlistActions";
import { SET_USER_DATA } from "./redux/types";
// components
import Home from "./pages/Home";
import Login from "./pages/Login";
// styles
import "./styles/App.css";
import "./styles/index.css";

axios.defaults.baseURL = "http://localhost:5001/vibe-maker-a6ee0/us-west2/api";

const token = localStorage.FBIdToken;
if (token) {
	const decodedToken: any = jwt_decode(token);
	if (decodedToken?.exp * 1000 < Date.now()) {
		// store.dispatch(logoutUser());
		localStorage.removeItem("FBIdToken");
		window.location.href = "/login";
	} else {
		axios.defaults.headers.common["Authorization"] = token;
		store.dispatch({
			type: SET_USER_DATA,
			payload: {
				email: decodedToken.email,
				handle: decodedToken.name,
				userId: decodedToken.user_id,
				newUser: false,
			},
		});
	}
} else {
	if (window.location.pathname !== "/login") {
		window.location.href = "/login";
	}
}

const App = ({ getPlaylist }: { getPlaylist(playlistId: string): void }) => {
	return (
		<Router history={history}>
			<Route exact path={["/", "/playlist/:playlist_id"]} component={Home} />
			<Route exact path="/login" component={Login} />
		</Router>
	);
};

// ts-ignore
export default connect(null, { getPlaylist })(App);
