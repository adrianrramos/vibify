import React, { Dispatch } from "react";
import Results from "./Results";
import { CSSTransition } from "react-transition-group";
import { TrackDataProps } from "./Card";
import { useSelector } from "react-redux";

// Redux
import { loadMoreSoundcloudResults, loadMoreResults, loadMoreVimeoResults } from "../../redux/actions/searchActions";
import { connect } from "react-redux";
import { YOUTUBE, SOUNDCLOUD, VIMEO, BOOKMARKS } from "../../redux/types";
import { RootState } from "../../redux/store";
import BookmarkContainer from "../Bookmarks/BookmarkContainer";

interface YTRootState {
  searchYoutube: {
    tracks: TrackDataProps[];
    loading: boolean;
    currentTerm: string;
    pageToken: string;
  };
}

interface SCRootState {
  searchSoundcloud: {
    tracks: TrackDataProps[];
    loading: boolean;
    currentTerm: string;
    nextPageLink: string;
  };
}

interface VRootState {
  searchVimeo: {
    tracks: TrackDataProps[];
    loading: boolean;
    currentTerm: string;
    nextPageLink: string;
  };
}

interface SearchResultsContainerProps {
  loadMoreResults(currentTerm: string, pageToken: string): (dispatch: Dispatch<any>) => Promise<void>;
  loadMoreSoundcloudResults(nextPageLink: string): (dispatch: Dispatch<any>) => Promise<void>;
  loadMoreVimeoResults(nextPageLink: string): (dispatch: Dispatch<any>) => Promise<void>;
}

const SearchResultsContainer = ({
  loadMoreResults,
  loadMoreSoundcloudResults,
  loadMoreVimeoResults,
}: SearchResultsContainerProps) => {
  // CSS Transition Mode
  const mode = useSelector((state: RootState) => state.mode);
  // YOUTUBE PROPS
  const tracks_YT = useSelector((state: YTRootState) => state.searchYoutube.tracks);
  const loading_YT = useSelector((state: YTRootState) => state.searchYoutube.loading);
  const currentTerm_YT = useSelector((state: YTRootState) => state.searchYoutube.currentTerm);
  const pageToken_YT = useSelector((state: YTRootState) => state.searchYoutube.pageToken);
  // SOUNDCLOUD PROPS
  const tracks_SC = useSelector((state: SCRootState) => state.searchSoundcloud.tracks);
  const loading_SC = useSelector((state: SCRootState) => state.searchSoundcloud.loading);
  const nextPageLink_SC = useSelector((state: SCRootState) => state.searchSoundcloud.nextPageLink);
  // VIMEO PROPS
  const tracks_V = useSelector((state: VRootState) => state.searchVimeo.tracks);
  const loading_V = useSelector((state: VRootState) => state.searchVimeo.loading);
  const nextPageLink_V = useSelector((state: VRootState) => state.searchVimeo.nextPageLink);
  return (
    <div>
      <CSSTransition in={mode === YOUTUBE} timeout={500} unmountOnExit>
        <Results
          tracks={tracks_YT}
          loading={loading_YT}
          currentTerm={currentTerm_YT}
          pageToken={pageToken_YT}
          addMoreResults={loadMoreResults}
        />
      </CSSTransition>
      <CSSTransition in={mode === SOUNDCLOUD} timeout={500} unmountOnExit>
        <Results
          tracks={tracks_SC}
          loading={loading_SC}
          nextPageLink={nextPageLink_SC}
          addMoreResults={loadMoreSoundcloudResults}
        />
      </CSSTransition>
      <CSSTransition in={mode === VIMEO} timeout={500} unmountOnExit>
        <Results
          tracks={tracks_V}
          loading={loading_V}
          nextPageLink={nextPageLink_V}
          addMoreResults={loadMoreVimeoResults}
        />
      </CSSTransition>
      <CSSTransition in={mode === BOOKMARKS} timeout={500} unmountOnExit>
        <BookmarkContainer />
      </CSSTransition>
    </div>
  );
};
export default connect(null, {
  loadMoreSoundcloudResults,
  loadMoreResults,
  loadMoreVimeoResults,
})(
  // @ts-ignore
  SearchResultsContainer
);
