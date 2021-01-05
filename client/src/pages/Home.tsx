import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsContainer from "../components/SearchResults/SearchResultsContainer";
import PlaylistContainer from "../components/Playlist/PlaylistContainer";
import Player from "../components/Player/Player";
import PlaylistHeader from "../components/Playlist/PlaylistHeader";
import AlertBox from "../components/General/AlertBox";

// styles
// import "../styles/App.css";
// import "../styles/index.css";

const Home = () => {
    return (
        <div className="app-container text-gray-100">
            <AlertBox />
            <div className="search-playlist-container mx-auto xl:w-3/4">
                <div className="app-left-side md:w-1/2 s:w-full my-10 px-5">
                    <SearchBar />
                    <SearchResultsContainer />
                </div>
                <div className="app-right-side md:w-1/2 s:w-full my-10 px-5">
                    <PlaylistHeader />
                    <PlaylistContainer />
                </div>
            </div>
            <Player />
        </div>
    );
};

export default Home;
