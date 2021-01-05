import React from "react";
import { RootState } from "../../redux/store";
import { deletePlaylist } from "../../redux/actions/playlistActions";
import { connect, useSelector } from "react-redux";

import "../../styles/PortalMarkup.css";
import "../../styles/DeleteDialog.css";

interface DeleteDialogProps {
  closePortal?(): void;
  deletePlaylist?(playlistId: string): void;
}

const DeleteDialog = ({ closePortal, deletePlaylist }: DeleteDialogProps) => {
  const playlistId = useSelector((state: RootState) => state.playlist.playlistId);

  return (
    <div className="portal-bkg" onClick={closePortal}>
      <div
        className="portal-container text-white text-center p-10 flex-column justify-center items-center bg-gray-900"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="portal-title text-4xl font-bold">Delete Playlist</h2>
        <p className="text-lg">Are you sure you want to delete this playlist?</p>
        <div className="delete-controls">
          <button
            onClick={() => {
              deletePlaylist && deletePlaylist(`${playlistId}`);
              closePortal && closePortal();
            }}
            className="rounded-lg bg-red-800 mx-2 py-2 px-6"
          >
            Delete
          </button>
          <button onClick={closePortal} className="rounded-lg bg-black mx-2 py-2 px-6">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { deletePlaylist })(DeleteDialog);
