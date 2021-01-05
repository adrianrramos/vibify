import React, { useState } from "react";
// Redux
import { YOUTUBE, SOUNDCLOUD, VIMEO, BOOKMARKS } from "../redux/types";
import { searchYoutube, searchSoundCloud, searchVimeo } from "../redux/actions/searchActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../redux/store";

import "../styles/SearchBar.css";
interface SearchBarProps {
  searchYoutube(term: string): (dispatch: Dispatch<any>) => Promise<void>;
  searchSoundCloud(term: string): (dispatch: Dispatch<any>) => Promise<void>;
  searchVimeo(term: string): (dispatch: Dispatch<any>) => Promise<void>;
}

const SearchBar = ({ searchYoutube, searchSoundCloud, searchVimeo }: SearchBarProps) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.mode);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="text-lg border-2 border-gray-700 w-full p-4 rounded-lg flex items-center xl:flex-row justify-between">
      <form
        onSubmit={e => {
          e.preventDefault();
          switch (mode) {
            case YOUTUBE:
              return searchYoutube(searchTerm);
            case SOUNDCLOUD:
              return searchSoundCloud(searchTerm);
            case VIMEO:
              return searchVimeo(searchTerm);
            case BOOKMARKS:
              return;
            default:
              return searchYoutube(searchTerm);
          }
        }}
        className="placeholder-gray-300 overflow-hidden"
      >
        <input
          autoComplete="off"
          type="text"
          name="searchSongs"
          id="searchSongs"
          className="bg-black focus:outline-none"
          placeholder="Search for songs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="focus:outline-none">
          <i className="fas fa-search " style={{ transform: "scaleX(-1)" }}></i>
        </button>
      </form>
      <div className="search-bar-icons flex">
        <div className="search-icon-bgk " onClick={() => dispatch({ type: YOUTUBE })}>
          <i
            className="mode-icon fab fa-youtube cursor-pointer"
            style={{ color: mode === YOUTUBE ? "rgb(196,48,43)" : "" }}
          ></i>
        </div>
        <div className="search-icon-bgk " onClick={() => dispatch({ type: SOUNDCLOUD })}>
          <i
            className="mode-icon fab fa-soundcloud   cursor-pointer"
            style={{ color: mode === SOUNDCLOUD ? "rgb(255,85,0)" : "" }}
          ></i>
        </div>
        <div className="search-icon-bgk " onClick={() => dispatch({ type: VIMEO })}>
          <i
            className="mode-icon fab fa-vimeo-v   cursor-pointer"
            style={{ color: mode === VIMEO ? "rgb(45,171,226)" : "" }}
          ></i>
        </div>
        <div className="search-icon-bgk " onClick={() => dispatch({ type: BOOKMARKS })}>
          <i
            className="mode-icon fas fa-layer-group cursor-pointer"
            style={{ color: mode === BOOKMARKS ? "rgba(76, 190, 79)" : "" }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  searchYoutube,
  searchSoundCloud,
  searchVimeo,
})(
  // @ts-ignore
  SearchBar
);
