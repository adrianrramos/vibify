import React, { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { TrackDataProps } from "./Card";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import { Dispatch } from "redux";

import "../../styles/Card.css";

interface ResultsProps {
  tracks: TrackDataProps[];
  loading: boolean;
  currentTerm?: string;
  pageToken?: string | number;
  nextPageLink?: string;
  addMoreResults: (...args: Array<any>) => (dispatch: Dispatch<any>) => Promise<void> | void;
}

const Results = ({
  tracks,
  loading,
  currentTerm,
  pageToken,
  nextPageLink,
  addMoreResults,
}: ResultsProps) => {
  useEffect(() => {
    tracks.length < 4 && nextPageLink && addMoreResults(nextPageLink);
  }, [tracks, nextPageLink, addMoreResults]);

  return (
    <>
      <div
        className="Results container overflow-x-auto"
        style={{ height: "750px" }}
        id="tracklist-scrollbar"
      >
        {tracks && tracks.map(track => <Card track={track} key={track.id} />)}
        {loading && <CardSkeleton />}

        <Waypoint
          onEnter={() => {
            if (tracks.length > 0) {
              if (currentTerm && pageToken) {
                addMoreResults(currentTerm, pageToken);
                return;
              } else if (nextPageLink) {
                addMoreResults(nextPageLink);
                return;
              }
            }
          }}
        >
          <button className="load-more-btn bg-black text-black"></button>
        </Waypoint>
      </div>
    </>
  );
};

export default Results;
