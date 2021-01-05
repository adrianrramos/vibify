import express from "express";
import cors from "cors";
require("dotenv").config();
import { region } from "firebase-functions";
import { AuthMiddleware } from "./util/authMiddleware";
import {
	createPlaylist,
	bookmarkPlaylist,
	unbookmarkPlaylist,
	getOnePlaylist,
	getUserBookmarks,
	deletePlaylist,
	updatePlaylistTracks,
	updatePlaylistTitle,
} from "./handlers/playlists";
import {
	searchYoutube,
	loadMoreResults,
	searchSoundCloud,
	loadMoreSoundcloudResults,
	searchVimeo,
	loadMoreVimeoResults,
} from "./handlers/searchApis";
import { createNewUser, getUser } from "./handlers/users";

const app = express();

app.use(cors());

// PLAYLIST ROUTES
// === === ===

// create a playlist
app.post("/playlist", AuthMiddleware, createPlaylist);

// get a playlist
app.get("/playlist/:playlistId", getOnePlaylist);

// update tracks inside a playlist
app.post("/playlist/:playlistId/tracks", AuthMiddleware, updatePlaylistTracks);

// update playlist title
app.post("/playlist/:playlistId/title", AuthMiddleware, updatePlaylistTitle);

// delete a playlist
app.delete("/playlist/:playlistId", AuthMiddleware, deletePlaylist);

// bookmark a playlist
app.get("/playlist/:playlistId/bookmark", AuthMiddleware, bookmarkPlaylist);

// un-bookmark a playlist
app.get("/playlist/:playlistId/unbookmark", AuthMiddleware, unbookmarkPlaylist);

// get all user's bookmarks
app.get("/user/:userHandle/bookmarks", getUserBookmarks);

// USER ROUTES
// === === ===

// Grab a user
app.get("/user", AuthMiddleware, getUser);

// create a new user
app.post("/signup", createNewUser);

// 3RD PARTY API ROUTES
app.get("/youtube", AuthMiddleware, searchYoutube);
app.get("/youtube/more", AuthMiddleware, loadMoreResults);

app.get("/soundcloud", AuthMiddleware, searchSoundCloud);
app.get("/soundcloud/more", AuthMiddleware, loadMoreSoundcloudResults);

app.get("/vimeo", AuthMiddleware, searchVimeo);
app.get("/vimeo/more", AuthMiddleware, loadMoreVimeoResults);

// app.get("/test", AuthMiddleware);

export const api = region("us-west2").https.onRequest(app);
