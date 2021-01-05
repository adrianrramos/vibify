import React, { useState, useEffect } from "react";
import { RootState } from "../../redux/store";
import { connect, useSelector } from "react-redux";
import { getPlaylist } from "../../redux/actions/playlistActions";

import "../../styles/Card.css";

interface BookmarkCardProps {
	bookmark: {
		playlistId: string;
		playlistTitle: string;
		bookmarkCount: number;
		owner: string;
		createdAt: string;
	};
	getPlaylist(playlistId: string): void;
}

const BookmarkCard = ({ getPlaylist, bookmark: { playlistTitle, owner, playlistId } }: BookmarkCardProps) => {
	const [highlight, setHighlight] = useState("");
	const currentPlaylistId = useSelector((state: RootState) => state.playlist.playlistId);

	const handleCardClick = async () => {
		const currentNewPath = `/playlist/${playlistId}`;
		window.history.pushState(null, "", currentNewPath);

		getPlaylist(playlistId);
	};

	useEffect(() => {
		currentPlaylistId === playlistId ? setHighlight("leftBorder") : setHighlight("");
	}, [currentPlaylistId, playlistId]);

	return (
		<div
			className={`track-cards container flex items-center p-5 my-5 bg-black rounded-lg overflow-hidden border border-gray-700 cursor-pointer ${highlight}`}
			onClick={() => handleCardClick()}
		>
			<div className="info-panel w-3/4">
				<h1 className="track-title-card">{playlistTitle}</h1>
				<p className="author">{owner}</p>
			</div>
		</div>
	);
};
export default connect(null, { getPlaylist })(BookmarkCard);
