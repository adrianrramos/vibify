import { Request, Response } from "express";
import { db } from "../util/admin";

/**
 * Grab the playlist that matches our request param playlistId
 */
export const getOnePlaylist = async (req: Request, res: Response) => {
  try {
    const playlistDocument = db.collection("playlists").doc(`${req.params.playlistId}`);

    const doc = await playlistDocument.get();

    if (doc.exists) {
      let playlistData = { ...doc.data(), playlistId: doc.id };

      return res.status(200).json(playlistData);
    } else {
      return res.status(404).json({ message: "Playlist not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

/**
 * Takes in a title from req.params.body.title to init
 * a new playlist object in the firestore playlists collection
 */
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    let title = req.body.title;
    // new playlist initial schema

    const newPlaylist = {
      bookmarkCount: 0,
      createdAt: new Date(),
      hidden: false,
      lastSaved: new Date(),
      owner: res.locals.userHandle,
      title: title,
      tracks: {},
      queue: [],
    };

    const doc = await db.collection("playlists").add(newPlaylist);
    const resPlaylist = { ...newPlaylist, playlistId: doc.id };

    return res.status(200).json(resPlaylist);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const updatePlaylistTracks = async (req: Request, res: Response) => {
  try {
    const playlistDocument = db.doc(`/playlists/${req.params.playlistId}`);
    await playlistDocument.update({ tracks: req.body.tracks, queue: req.body.queue });
    return res.json({ message: "Tracks have saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const updatePlaylistTitle = async (req: Request, res: Response) => {
  try {
    const playlistDocument = db.doc(`/playlists/${req.params.playlistId}`);
    await playlistDocument.update({ title: req.body.title });
    return res.json({ message: "Title has updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

/**
 * Takes a user id from the auth middleware
 * and takes playlist id from req.params
 * to delete a playlist from firestore
 */
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    // grab playlist
    const playlistDocument = db.doc(`/playlists/${req.params.playlistId}`);
    const doc = await playlistDocument.get();

    if (doc.exists) {
      // check if the owner matches current user
      if (doc.data()?.owner === res.locals.userHandle) {
        // delete the playlist
        await playlistDocument.delete();

        // delete all associated bookmarks
        const snapshot = await db.collection("bookmarks").where("playlistId", "==", `${req.params.playlistId}`).get();

        if (snapshot.empty) return res.json({ message: "No bookmarks found" });

        const promises: Promise<FirebaseFirestore.WriteResult>[] = [];
        for (let doc of snapshot.docs) {
          promises.push(db.collection("bookmarks").doc(`${doc.id}`).delete());
        }

        await Promise.all(promises);

        return res.json({ message: "Playlist and its bookmarks have been successfully deleted " });
      } else {
        return res.status(401).json({ message: "You are not allowed to do that" });
      }
    } else {
      return res.status(404).json({ message: "Playlist not found. " });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

/**
 * Takes a playlist id and grabs the user handle from the res.locals
 * creates a new bookmark document inside the bookmarks collection
 * associates a user with a playlist inside the bookmark document
 */
export const bookmarkPlaylist = async (req: Request, res: Response) => {
  try {
    // bookmark document ref to check if it EXISTS
    const bookmarkDocument = db
      .collection("bookmarks")
      .where("user", "==", res.locals.userHandle)
      .where("playlistId", "==", req.params.playlistId)
      .limit(1);

    const playlistDocument = db.doc(`/playlists/${req.params.playlistId}`);

    const doc = await playlistDocument.get();

    if (doc.exists) {
      let playlistData = {
        ...doc.data(),
        playlistId: req.params.playlistId,
        bookmarkCount: doc.data()?.bookmarkCount,
      };

      const data = await bookmarkDocument.get();
      // if data.empty that means bookmark does not exist
      if (data.empty) {
        await db
          .collection("bookmarks")
          .add({ playlistId: req.params.playlistId, user: res.locals.userHandle, createdAt: new Date() });
        playlistData.bookmarkCount++;
        await playlistDocument.update({ bookmarkCount: playlistData.bookmarkCount });
        return res.status(200).json(playlistData);
      } else {
        return res.status(400).json({ error: "Playlist already bookmarked" });
      }
    } else {
      return res.status(404).json({ error: "Playlist not found", data: doc.exists });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

/**
 * Takes a playlist id and grabs the user handle from the res.locals
 * delete a bookmark document inside the bookmarks collection
 * associates a user with a playlist inside the bookmark document
 */
export const unbookmarkPlaylist = async (req: Request, res: Response) => {
  try {
    //  bookmark document ref to check if it EXISTS
    const bookmarkDocument = db
      .collection("bookmarks")
      .where("user", "==", res.locals.userHandle)
      .where("playlistId", "==", req.params.playlistId)
      .limit(1);

    const playlistDocument = db.doc(`/playlists/${req.params.playlistId}`);

    const doc = await playlistDocument.get();

    if (doc.exists) {
      let playlistData = {
        ...doc.data(),
        playlistId: doc.id,
        bookmarkCount: doc.data()?.bookmarkCount,
      };

      const data = await bookmarkDocument.get();

      if (data.empty) {
        return res.status(400).json({ error: "Playlist not bookmarked" });
      } else {
        await db.doc(`/bookmarks/${data.docs[0].id}`).delete();
        playlistData.bookmarkCount--;
        await playlistDocument.update({ bookmarkCount: playlistData.bookmarkCount });

        return res.status(200).json(playlistData);
      }
    } else {
      return res.status(404).json({ error: "Playlist not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};

/**
 * Grab all the bookmarks associated with one user
 * => take the user handle => index all bookmarks with matching user handle
 * => return list with each playlist's id, title, and bookmarkCount
 */
export const getUserBookmarks = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("bookmarks").where("user", "==", `${req.params.userHandle}`).get();

    if (snapshot.empty) return res.json({ message: "No bookmarks found" });

    const userBookmarks: { playlistId: string; playlistTitle: string; bookmarkCount: number }[] = [];
    const userData = { bookmarks: userBookmarks };
    const promises: Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>[] = [];

    for (let doc of snapshot.docs) {
      promises.push(db.collection("playlists").doc(`${doc.data().playlistId}`).get());
    }

    const playlistDocs = await Promise.all(promises);

    playlistDocs.forEach(doc => {
      let bookmarkData = {
        playlistId: doc.id,
        playlistTitle: doc.data()?.title,
        bookmarkCount: doc.data()?.bookmarkCount,
        owner: doc.data()?.owner,
        createdAt: doc.data()?.createdAt,
      };
      userData.bookmarks.push(bookmarkData);
    });

    return res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
