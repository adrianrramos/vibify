import { YOUTUBE, SOUNDCLOUD, VIMEO, DAILYMOTION, MXCLOUD, BOOKMARKS } from "../types";

export default (state: string = YOUTUBE, { type }: { type: string }) => {
  switch (type) {
    case YOUTUBE:
      return YOUTUBE;
    case SOUNDCLOUD:
      return SOUNDCLOUD;
    case VIMEO:
      return VIMEO;
    case DAILYMOTION:
      return DAILYMOTION;
    case MXCLOUD:
      return MXCLOUD;
    case BOOKMARKS:
      return BOOKMARKS;
    default:
      return state;
  }
};
