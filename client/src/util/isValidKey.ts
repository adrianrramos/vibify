import { SavedTrackProps } from "../components/Playlist/PlaylistContainer";

export default function isValidKey(
  trackKey: string,
  savedTracks: SavedTrackProps
): trackKey is keyof typeof savedTracks {
  return trackKey in savedTracks;
}
