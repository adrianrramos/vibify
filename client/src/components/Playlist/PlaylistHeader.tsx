import React from "react";
import { useSelector } from "react-redux";
import ToolButton from "./ToolButton";
import PortalToggle from "../General/PortalToggle";
import DeleteDialog from "./DeleteDialog";

interface RootState {
	playlist: {
		title: string;
	};
}

interface PlaylistHeaderProps {}

const PlaylistHeader = () => {
	const title = useSelector((state: RootState) => state.playlist.title);

	return (
		<div
			className="playlistheader bg-gray-900 border-2 border-gray-700 p-5 rounded-lg text-gray-300"
			style={{ height: "86px", display: "flex", justifyContent: "center", alignItems: "center" }}
		>
			{title ? (
				<>
					<h1 className="flex playlist-title text-center text-lg p-1 items-center justify-between">
						{title}
					</h1>
					<ToolButton type="save" icon={<i className="mode-icon far fa-save"></i>} />
					<ToolButton type="copy" icon={<i className="mode-icon far fa-share-square"></i>} />

					<PortalToggle
						btnClassName=""
						icon={<ToolButton type="delete" icon={<i className="mode-icon far fa-trash-alt"></i>} />}
					>
						<DeleteDialog />
					</PortalToggle>
				</>
			) : (
				"Please select a playlist or create one"
			)}
		</div>
	);
};
export default PlaylistHeader;
