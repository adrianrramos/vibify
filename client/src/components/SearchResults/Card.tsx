import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { setCurrentTrack } from "../../redux/actions/playerActions";
import { saveNewTrack } from "../../redux/actions/playlistActions";
import Decoder from "../../util/decode";

import "../../styles/Card.css";
interface PlayerRootState {
  player: {
    currentTrack: string[];
    buffering: boolean;
  };
}

interface RootState {
  playlist: {
    savedTracks: {};
  };
}

interface SongItemProps {
  track: TrackDataProps;
  key: string;
  setCurrentTrack(url: string, title: string): void;
  saveNewTrack(track?: TrackDataProps): void;
}

export interface TrackDataProps {
  id: string;
  artwork: string;
  title: string;
  author: string;
  url: string;
  type: string;
}

const Card = ({ track: { id, artwork, title, author, url }, track, setCurrentTrack, saveNewTrack }: SongItemProps) => {
  const savedTracks = useSelector((state: RootState) => state.playlist.savedTracks);
  const currentTrack = useSelector((state: PlayerRootState) => state.player.currentTrack);
  const buffering = useSelector((state: PlayerRootState) => state.player.buffering);

  const [leftBorder, setLeftBorder] = useState<string>("");
  const [cardPulse, setCardPulse] = useState<string>("");

  useEffect(() => {
    if (currentTrack[0] === url) {
      setLeftBorder("leftBorder");

      buffering ? setCardPulse("card-pulse") : setCardPulse("");
    } else {
      setLeftBorder("");
      setCardPulse("");
    }
  }, [currentTrack, url, buffering]);

  return (
    <div className="outer-card">
      <div
        className={`track-cards container flex items-center my-5 bg-black  overflow-hidden  cursor-pointer ${leftBorder} ${cardPulse}`}
        onClick={() => setCurrentTrack(url, title)}
      >
        <div className="track-art-container">
          {artwork === null ? (
            <p
              className="missing-art"
              style={{
                position: "relative",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              Missing Artwork
            </p>
          ) : (
            <img src={artwork} alt="track art" className="track-art" />
          )}
        </div>
        <div className="info-panel w-3/4">
          <h1 className="track-title-card">{Decoder(title)}</h1>
          <p className="author">{author}</p>
        </div>
        <div
          className="card-controls"
          onClick={e => {
            e.stopPropagation();
            if (id in savedTracks) {
              return;
            }

            saveNewTrack({ ...track });
          }}
        >
          <i className="fas fa-plus add-to-playlist"></i>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setCurrentTrack, saveNewTrack })(Card);
