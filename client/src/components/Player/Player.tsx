import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Duration from "../../util/Duration";
import decode from "../../util/decode";
import isValidKey from "../../util/isValidKey";
import shuffle from "../../util/shuffle";
// REDUX
import { useSelector, connect, useDispatch } from "react-redux";
import { setCurrentTrackFromPlaylist } from "../../redux/actions/playerActions";
import {
  SET_BUFFERING,
  CLEAR_BUFFERING,
  SET_PLAYER_QUEUE,
  STORE_ORIGINAL_QUEUE,
  RESTORE_QUEUE,
  REFRESH_QUEUE,
  CLEAR_PLAYER_QUEUE,
  CLEAR_CURRENT_TRACK,
} from "../../redux/types";

import { SavedTrackProps } from "../Playlist/PlaylistContainer";
import "../../styles/Player.css";

interface RootState {
  player: {
    currentTrack: string[];
    playerQueue: string[];
  };
  playlist: {
    savedTracks: SavedTrackProps;
    queue: string[];
    originalQueue: string[];
    title: string;
  };
}

const Player = ({
  setCurrentTrackFromPlaylist,
}: {
  setCurrentTrackFromPlaylist(url: string, title: string, id: string, queue: string[]): void;
}) => {
  // REDUX
  const dispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.player.currentTrack);
  const playerQueue = useSelector((state: RootState) => state.player.playerQueue);
  const savedTracks = useSelector((state: RootState) => state.playlist.savedTracks);
  const queue = useSelector((state: RootState) => state.playlist.queue);
  const originalQueue = useSelector((state: RootState) => state.playlist.originalQueue);
  const titleState = useSelector((state: RootState) => state.playlist.title);
  // COMPONENT STATE
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [trackId, setTrackId] = useState<string>("");
  const [playing, setPlaying] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [seeking, setSeeking] = useState<boolean | undefined>(undefined);
  const [played, setPlayed] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [shuffled, setShuffled] = useState<boolean>(false);

  // Setting the initial playlist data
  useEffect(() => {
    if (currentTrack.length > 0) {
      const [currentUrl, currentTitle, currentId] = currentTrack;
      setUrl(currentUrl);
      setTitle(currentTitle);
      setTrackId(currentId);
      setPlaying(true);
    }
  }, [currentTrack]);

  // Loading a new track into the player
  useEffect(() => {
    url && dispatch({ type: SET_BUFFERING });
    setPlayed(0);
  }, [url, dispatch]);

  // Updating the player's time display
  useEffect(() => {
    if (played > 0) {
      setElapsed(duration * played);
      setRemaining(duration * (1 - played));
    }
  }, [played, duration]);

  // Whipe state when switching playlists
  useEffect(() => {
    setShuffled(false);
    dispatch({ type: CLEAR_PLAYER_QUEUE });
    dispatch({ type: CLEAR_CURRENT_TRACK });
  }, [titleState, dispatch]);

  // PLAYER EVENTS
  const handleProgress = ({ played }: { played: number }) => {
    if (!seeking) {
      setPlayed(played);
    }
  };

  const playNextSong = () => {
    if (playerQueue[1]) {
      const index = playerQueue[1];

      if (!isValidKey(index, savedTracks)) {
        throw Error("invalid index used to skip forward");
      }

      let nextQueue = [...playerQueue];
      const nextUrl = savedTracks[index].url;
      const nextTitle = savedTracks[index].title;
      nextQueue.shift();

      setCurrentTrackFromPlaylist(nextUrl, nextTitle, trackId, nextQueue);
    }
  };

  const handleSkipBack = () => {
    if (played > 0.1) {
      setPlayed(0);
      player?.current?.seekTo(0);
      return;
    }

    let prevIndex = queue.findIndex((id: string) => id === playerQueue[0]);

    if (prevIndex > 0) {
      prevIndex = prevIndex - 1;
      const prevId = queue[prevIndex];

      if (!isValidKey(prevId, savedTracks)) {
        throw Error("invalid index used to skip back");
      }

      const prevUrl = savedTracks[prevId].url;
      const prevTitle = savedTracks[prevId].title;
      const prevQueue = queue.slice(prevIndex);

      setCurrentTrackFromPlaylist(prevUrl, prevTitle, trackId, prevQueue);
    }
  };

  const handleShuffle = () => {
    if (!shuffled) {
      dispatch({ type: STORE_ORIGINAL_QUEUE, payload: queue });
      if (currentTrack.length > 0) {
        let shuffledQueue = shuffle(queue, trackId);

        dispatch({ type: SET_PLAYER_QUEUE, payload: shuffledQueue });
        dispatch({ type: REFRESH_QUEUE, payload: shuffledQueue });
      } else {
        let shuffledQueue = shuffle(queue);

        dispatch({ type: SET_PLAYER_QUEUE, payload: shuffledQueue });
        dispatch({ type: REFRESH_QUEUE, payload: shuffledQueue });
      }

      setShuffled(true);
    } else {
      dispatch({ type: RESTORE_QUEUE, payload: originalQueue });
      setShuffled(false);
    }
  };

  const player = useRef<ReactPlayer | null>(null);
  return (
    <>
      {/* TODO: SPLIT INTO THREE SECTIONS PLAY SLIDER / TRACK TITLE / CONTROLS */}
      <div className="player-controller bg-black mx-auto w-full text-4xl items-center md:px-10 md:flex s:flex-col">
        <div className="player-panel-1 xl:w-1/2 md:w-1/2 sm:w-full flex">
          <Duration className="track-time mx-2" seconds={elapsed} />
          <input
            className="played-slider w-1/2"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={() => setSeeking(true)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayed(parseFloat(e.target.value))}
            onMouseUp={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
              const target = e.target as HTMLInputElement;
              setSeeking(false);
              player.current?.seekTo(parseFloat(target.value));
            }}
          />
          <Duration className="track-time mx-2" seconds={remaining} />
        </div>
        <div className="player-panel-2 track-title w-full xl:w-1/4 md:w-1/2 sm:w-full">
          <h1 className="current-title ">{title ? decode(title) : "Listening to nothing... 😢"}</h1>
        </div>
        <div className="player-panel-3 flex items-center">
          <i
            className="cursor-pointer fas fa-undo-alt mx-3"
            onClick={() => setLoop(!loop)}
            style={{ opacity: loop ? 1 : 0.25 }}
          ></i>
          <i className="cursor-pointer fas fa-step-backward mx-2" onClick={() => handleSkipBack()}></i>
          {playing ? (
            <i className="cursor-pointer fas fa-pause mx-2" onClick={() => setPlaying(!playing)}></i>
          ) : (
            <i className="cursor-pointer fas fa-play mx-2" onClick={() => setPlaying(!playing)}></i>
          )}
          <i
            className="cursor-pointer fas fa-step-forward mx-2"
            onClick={() => {
              setPlayed(0.999999);
              player?.current?.seekTo(0.999999);
            }}
          ></i>
          <i
            className="cursor-pointer fas fa-random mx-3"
            onClick={handleShuffle}
            style={{ opacity: shuffled ? 1 : 0.25 }}
          ></i>
          <span className="mute-volume" onClick={() => setMuted(!muted)}>
            {muted || volume === 0 ? (
              <i className="volume-icon cursor-pointer fas fa-volume-mute mx-3"></i>
            ) : volume > 0.5 ? (
              <i className="volume-icon cursor-pointer fas fa-volume-up mx-3"></i>
            ) : (
              <i className="volume-icon cursor-pointer fas fa-volume-down mx-3"></i>
            )}
          </span>
          <input
            className="volume-slider w-auto"
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <ReactPlayer
        ref={player}
        url={url}
        playing={playing}
        loop={loop}
        volume={volume}
        muted={muted}
        onBuffer={() => dispatch({ type: SET_BUFFERING })}
        onBufferEnd={() => dispatch({ type: CLEAR_BUFFERING })}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onProgress={data => {
          handleProgress(data);
          dispatch({ type: CLEAR_BUFFERING });
        }}
        onDuration={currDuration => setDuration(currDuration)}
        onEnded={() => playNextSong()}
        width="0"
        height="0"
        onError={err => {
          console.log("error with player ");
        }}
      />
    </>
  );
};

export default connect(null, { setCurrentTrackFromPlaylist })(Player);
