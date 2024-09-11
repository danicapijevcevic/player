import {
  FETCH_ALL,
  CURRENT_PLAYLIST,
  NOW_PLAYING,
  SHOW_MODAL_WINDOW,
  UPDATE_ALBUM,
} from "./types";
import json from "../playlist.json";
import { getUnique } from "../utils";

export const fetchAll = (dispatch) => {
  const allTracks = json
    .map((item) =>
      item.name.map((i, trackindex) => ({
        trackName: i,
        composer: item.compos_,
        period: item.period_,
        album: item.title,
        composerImage: item.composerimage_,
        albumImage: item.image__,
        duration: item.duration[trackindex],
        source: item.src[trackindex],
      }))
    )
    .flat()
    .map((item, index) => ({ ...item, key: index }));
  const composersNames = getUnique(json.map((item) => item.compos_));
  const composers = composersNames.map((item) => ({
    name: item,
    img: json.find((i) => i.compos_ === item).composerimage_,
    albums: allTracks.filter((i) => i.composer === item),
    period: json.find((i) => i.compos_ === item).period_,
  }));
  const albums = json.map((item) => ({
    composer: item.compos_,
    album: item.title,
    period: item.period_,
    albumImage: item.image__,
  }));

  dispatch({
    type: FETCH_ALL,
    value: {
      raw: json,
      allTracks,
      composers,
      albums,
    },
  });
};
export const setAlbumsUpdate = (value) => ({
  type: UPDATE_ALBUM,
  value,
});
export const setCurrentPlaylist = (value) => ({
  type: CURRENT_PLAYLIST,
  value,
});

export const setNowPlaying = (value) => ({
  type: NOW_PLAYING,
  value,
});
export const setShowModalWindow = (value) => ({
  type: SHOW_MODAL_WINDOW,
  value,
});
