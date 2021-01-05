import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { setCurrentTrackFromPlaylist } from "../../redux/actions/playerActions";
import { deleteTrack } from "../../redux/actions/playlistActions";
import { TrackDataProps } from "../SearchResults/Card";
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
    queue: string[];
  };
}

interface SongItemProps {
  track: TrackDataProps;
  key: string;
  setCurrentTrackFromPlaylist(url: string, title: string, id: string, queue: string[]): void;
  deleteTrack(id: string): void;
}

const PlaylistTrackCard = ({
  track: { id, artwork, title, author, url },
  setCurrentTrackFromPlaylist,
  deleteTrack,
}: SongItemProps): JSX.Element => {
  const queue = useSelector((state: RootState) => state.playlist.queue);
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
    <div
      className={`track-cards container flex items-center my-5 bg-black overflow-hidden cursor-pointer ${leftBorder} ${cardPulse}`}
      onClick={() => {
        const startHere = queue.findIndex(idSearch => idSearch === id);

        setCurrentTrackFromPlaylist(url, title, id, queue.slice(startHere));
      }}
    >
      <div className="track-art-container">
        <img src={artwork} alt="track art" className="track-art" />
      </div>
      <div className="info-panel w-3/4">
        <h1 className="track-title-card">{Decoder(title)}</h1>
        <p className="author">{author}</p>
      </div>
      <div className="card-controls" onClick={e => e.stopPropagation()}>
        <i className="fas fa-times remove-from-playlist" onClick={() => deleteTrack(id)}></i>
      </div>
    </div>
  );
};

export default connect(null, { setCurrentTrackFromPlaylist, deleteTrack })(PlaylistTrackCard);
