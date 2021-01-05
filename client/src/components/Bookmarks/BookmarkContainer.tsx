import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SET_BOOKMARKS, SET_BOOKMARKS_LOADING } from "../../redux/types";
import axios from "axios";

import BookmarkCard from "./BookmarkCard";
import CreateBookmark from "./CreateBookmark";

import "../../styles/Card.css";

interface BookmarkDateProp {
  createdAt: { _seconds: number };
}

const BookmarkContainer = () => {
  const [activateInput, setActivateInput] = useState(false);
  const bookmarks = useSelector((state: RootState) => state.userBookmarks.bookmarks);
  const handle = useSelector((state: RootState) => state.user.handle);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_BOOKMARKS_LOADING });

    async function fetchUserBookmarks(username: string) {
      const {
        data: { bookmarks },
      } = await axios.get(`/user/${username}/bookmarks`);

      bookmarks &&
        bookmarks.sort((a: BookmarkDateProp, b: BookmarkDateProp) => {
          let date1 = +new Date(a.createdAt._seconds * 1000);
          let date2 = +new Date(b.createdAt._seconds * 1000);

          return date1 - date2;
        });
      if (bookmarks) dispatch({ type: SET_BOOKMARKS, payload: bookmarks });
    }

    fetchUserBookmarks(handle);
  }, [dispatch, handle]);

  return (
    <>
      <div className="BookmarkContainer container overflow-x-auto" style={{ height: "750px" }} id="tracklist-scrollbar">
        {bookmarks.length > 0 &&
          bookmarks.map(bookmark => <BookmarkCard bookmark={bookmark} key={bookmark.playlistId} />)}
        <div
          className="track-cards container flex items-center p-5 my-5 bg-black rounded-lg overflow-hidden border border-gray-700 cursor-pointer"
          onClick={() => setActivateInput(true)}
        >
          {activateInput ? (
            <>
              <CreateBookmark open={activateInput} />
              <div className="card-controls">
                <i
                  className="fas fa-times remove-from-playlist"
                  onClick={event => {
                    event.stopPropagation();
                    setActivateInput(false);
                  }}
                ></i>
              </div>
            </>
          ) : (
            <div className="info-panel w-3/4">
              <h1 className="track-title-card">{bookmarks.length > 0 ? "Add another playlist" : "Add a playlist"}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarkContainer;
