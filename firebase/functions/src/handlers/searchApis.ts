import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import axios from "axios";
import {
	youtube,
	YOUTUBE_KEY,
	soundcloud,
	SOUNDCLOUD_CLIENT_ID,
	vimeo,
	VIMEO_CLIENT_ID,
	VIMEO_ACCESS_TOKEN,
	VIMEO_CLIENT_SECRETS,
} from "../util/apis";

export interface TrackDataProps {
	id: string;
	artwork: string;
	title: string;
	author: string;
	url: string;
	type: string;
}

export interface SoundCloudResultProp {
	id: number;
	title: string;
	permalink_url: string;
	artwork_url: string;
	user: {
		username: string;
	};
}

// SEARCH YOUTUBE ACTIONS
/**
 * Runs a search Query on the Youtube Data API v3.
 * Quota Limit of 10,000 units per day, go to google docs for more information.
 * https://developers.google.com/youtube/v3
 */
export const searchYoutube = async (req: Request, res: Response) => {
	try {
		const { data } = await youtube.get("/search", {
			params: {
				part: "snippet",
				type: "video",
				key: YOUTUBE_KEY,
				maxResults: 25,
				q: req.query.term,
			},
		});

		const resultData = saveYoutubeResults(data);

		return res.json(resultData);
	} catch (err) {
		console.log(Object.keys(err), err.message);
		return res.status(500).json({ message: err.message });
	}
};

export const loadMoreResults = async (req: Request, res: Response) => {
	try {
		const { data } = await youtube.get("/search", {
			params: {
				part: "snippet",
				type: "video",
				key: YOUTUBE_KEY,
				maxResults: 20,
				q: `${req.query.term}`,
				pageToken: `${req.query.pageToken}`,
			},
		});

		const resultData = saveYoutubeResults(data);

		return res.json(resultData);
	} catch (err) {
		console.log(Object.keys(err), err.message);
		return res.status(500).json({ message: err.message });
	}
};

const saveYoutubeResults = (data: any) => {
	let tracklist: any[] = [];

	data.items.forEach(({ id, snippet }: any) => {
		let trackData = {
			id: uuid(),
			artwork: snippet.thumbnails.high.url,
			title: snippet.title,
			author: snippet.channelTitle,
			url: `https://www.youtube.com/watch?v=${id.videoId}`,
			type: "YOUTUBE",
		};

		tracklist.push(trackData);
	});

	const newPageToken = data.nextPageToken;
	tracklist.push(newPageToken);
	return tracklist;
};

// // SEARCH SOUNDCLOUD ACTIONS
export const searchSoundCloud = async (req: Request, res: Response) => {
	try {
		const {
			data: { collection, next_href },
		} = await soundcloud.get("/tracks", {
			params: {
				format: "json",
				q: `${req.query.term}`,
				limit: "25",
				linked_partitioning: 1,
				client_id: `${SOUNDCLOUD_CLIENT_ID}`,
			},
		});

		const resultData = saveSoundcloudResults(collection, next_href);

		return res.json(resultData);
	} catch (err) {
		console.log(Object.keys(err), err.message);
		return res.status(500).json({ message: err.message });
	}
};

export const loadMoreSoundcloudResults = async (req: Request, res: Response) => {
	try {
		const {
			data: { collection, next_href },
		} = await axios.get(`${req.query.nextPageLink}`);

		const resultData = saveSoundcloudResults(collection, next_href);

		return res.json(resultData);
	} catch (err) {
		console.log(Object.keys(err), err.message);
		return res.status(500).json({ message: err.message });
	}
};

const saveSoundcloudResults = (collection: SoundCloudResultProp[], next_href: string) => {
	let trackList: (TrackDataProps | string)[] = [];

	collection.forEach(({ title, permalink_url, user: { username }, artwork_url }: SoundCloudResultProp) => {
		let trackData: TrackDataProps = {
			id: uuid(),
			artwork: artwork_url,
			title,
			author: username,
			url: permalink_url,
			type: "SOUNDCLOUD",
		};

		trackList.push(trackData);
	});

	trackList.push(next_href);
	return trackList;
};

// // SEARCH VIMEO ACTIONS
export const searchVimeo = async (req: Request, res: Response) => {
	try {
		const { data } = await vimeo.get("/videos", {
			params: {
				client_id: `${VIMEO_CLIENT_ID}`,
				client_secrets: `${VIMEO_CLIENT_SECRETS}`,
				access_token: `${VIMEO_ACCESS_TOKEN}`,
				query: `${req.query.term}`,
			},
		});

		const resultData = saveVimeoResults(data.data, data.paging.next);

		return res.json(resultData);
	} catch (err) {
		console.log(Object.keys(err), err.message);
		return res.status(500).json({ message: err.message });
	}
};

export const loadMoreVimeoResults = async (req: Request, res: Response) => {
	try {
		const { data } = await vimeo.get(`${req.query.nextPageLink}`);
		const resultData = saveVimeoResults(data.data, data.paging.next);

		return res.json(resultData);
	} catch (err) {
		console.log(Object.keys(err), err.message);
		return res.status(500).json({ message: err.message });
	}
};

const saveVimeoResults = (data: any[], nextPageLink: string) => {
	let trackList: (TrackDataProps | string)[] = [];

	data.forEach(track => {
		let artArrLength = track.pictures.sizes.length;

		let trackData: TrackDataProps = {
			id: uuid(),
			artwork: track.pictures.sizes[artArrLength - 1].link,
			title: track.name,
			author: track.user.name,
			url: track.link,
			type: "VIMEO",
		};

		trackList.push(trackData);
	});

	trackList.push(nextPageLink);
	return trackList;
};
