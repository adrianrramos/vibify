import axios from "axios";

export const YOUTUBE_KEY = process.env.YOUTUBE_KEY;

export const youtube = axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
});

export const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;

export const soundcloud = axios.create({
	baseURL: "https://api.soundcloud.com",
});

export const VIMEO_CLIENT_ID = process.env.VIMEO_CLIENT_ID;
export const VIMEO_CLIENT_SECRETS = process.env.VIMEO_CLIENT_SECRETS;
export const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

export const vimeo = axios.create({
	baseURL: "https://api.vimeo.com/",
});
