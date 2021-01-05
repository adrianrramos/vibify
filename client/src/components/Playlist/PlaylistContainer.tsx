import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import isValidKey from "../../util/isValidKey";
import { TrackDataProps } from "../SearchResults/Card";
import { SET_PLAYER_QUEUE } from "../../redux/types";
import PlaylistTrackCard from "./PlaylistTrackCard";

import { getPlaylist } from "../../redux/actions/playlistActions";
import { connect } from "react-redux";

import "../../styles/Card.css";

interface RootState {
	playlist: {
		savedTracks: SavedTrackProps;
		queue: string[];
	};
}

interface TrackListContainerProps {
	getPlaylist(id: string): void;
}

export interface SavedTrackProps {
	trackKey: TrackDataProps;
}

const TrackListContainer = ({ getPlaylist }: TrackListContainerProps) => {
	const dispatch = useDispatch();
	const savedTracks = useSelector((state: RootState) => state.playlist.savedTracks);
	const queue = useSelector((state: RootState) => state.playlist.queue);

	useEffect(() => {
		dispatch({ type: SET_PLAYER_QUEUE, payload: queue });
	}, [savedTracks, queue, dispatch]);

	useEffect(() => {
		const playlistId = window.location.pathname;
		if (playlistId.split("/")[1] === "playlist") {
			// fetch the playlist
			let id = playlistId.split("/")[2];
			getPlaylist(id);
		}
	}, [getPlaylist]);

	return (
		<>
			<div
				className="TrackListContainer container overflow-x-auto"
				style={{ height: "750px" }}
				id="tracklist-scrollbar"
			>
				{queue?.length > 0 &&
					queue.map(trackKey => {
						if (!isValidKey(trackKey, savedTracks)) {
							throw Error("invalid track key passed to playlist");
						}
						return <PlaylistTrackCard track={savedTracks[trackKey]} key={trackKey} />;
					})}
			</div>
		</>
	);
};

export default connect(null, { getPlaylist })(TrackListContainer);
