import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ADD_BOOKMARK } from "../../redux/types";

const CreateBookmark = ({ open }: { open: boolean }) => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const dispatch = useDispatch();

  const createNewPlaylist = async (title: string) => {
    const { data: newPlaylist } = await axios.post("/playlist", {
      title,
    });
    const newBookmarkData = {
      playlistId: newPlaylist.playlistId,
      playlistTitle: newPlaylist.title,
      bookmarkCount: 1,
      owner: newPlaylist.owner,
    };
    dispatch({ type: ADD_BOOKMARK, payload: newBookmarkData });

    const { data: newBookmark } = await axios.get(`/playlist/${newPlaylist.playlistId}/bookmark`);

    console.log(newBookmark);
  };

  return (
    <div className="info-panel w-full">
      <form
        onSubmit={event => {
          event.preventDefault();
          createNewPlaylist(playlistTitle);
          setPlaylistTitle("");
        }}
      >
        <input
          className="bg-black focus:outline-none border-b-2  border-gray-700"
          type="text"
          placeholder="Name your playlist..."
          value={open ? playlistTitle : ""}
          onChange={event => setPlaylistTitle(event.target.value)}
          required
        />
        <button type="submit" className="border rounded-lg mx-2 p-1">
          Save
        </button>
      </form>
    </div>
  );
};
export default CreateBookmark;
