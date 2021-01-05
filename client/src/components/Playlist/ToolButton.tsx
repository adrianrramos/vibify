import React from "react";
import { savePlaylist, editPlaylistTitle, deletePlaylist } from "../../redux/actions/playlistActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { SHOW_COPIED } from "../../redux/types";

interface SaveButtonProps {
	savePlaylist?(playlistId: string, tracks: {}, queue: string[]): void;
	deletePlaylist?(playlistId: string): void;
	editPlaylistTitle?(playlistId: string, newTitle: string): void;
	icon: JSX.Element;
	type: string;
}

interface RootState {
	playlist: {
		savedTracks: {};
		playlistId: string;
		queue: string[];
	};
}

const ToolButton = ({ icon, type, savePlaylist, editPlaylistTitle, deletePlaylist }: SaveButtonProps) => {
	const dispatch = useDispatch();
	const savedTracks = useSelector((state: RootState) => state.playlist.savedTracks);
	const queue = useSelector((state: RootState) => state.playlist.queue);
	const playlistId = useSelector((state: RootState) => state.playlist.playlistId);

	const copyToClipboard = () => {
		const pageURL = window.location.href;
		navigator.clipboard.writeText(pageURL).then(() => dispatch({ type: SHOW_COPIED }));
	};

	return (
		<div
			className="search-icon-bgk"
			onClick={() => {
				type === "save" && savePlaylist && savePlaylist(`${playlistId}`, { ...savedTracks }, queue);
				type === "copy" && copyToClipboard();
				// type === "delete" && deletePlaylist && deletePlaylist(`${playlistId}`);
			}}
		>
			{icon}
		</div>
	);
};
export default connect(null, { savePlaylist, editPlaylistTitle, deletePlaylist })(ToolButton);
