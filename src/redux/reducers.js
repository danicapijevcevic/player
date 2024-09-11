import { combineReducers } from "redux";
import {
  FETCH_ALL,
  CURRENT_PLAYLIST,
  NOW_PLAYING,
  SHOW_MODAL_WINDOW,
  UPDATE_ALBUM,
} from "./types";

const initialState = {
  allLists: null,
  currentPlaylist: null,
  nowPlaying: null,
  showModal: false,
};

const getPlayerValues = (state = initialState, { type, value }) => ({
  ...state,
  ...{
    [FETCH_ALL]: { allLists: value },
    [CURRENT_PLAYLIST]: { currentPlaylist: value },
    [NOW_PLAYING]: { nowPlaying: value },
    [SHOW_MODAL_WINDOW]: { showModal: value },
    [UPDATE_ALBUM]: {
      allLists: {
        ...state.allLists,
        albums: [value].concat(state?.allLists?.albums),
      },
    },
  }[type],
});

const allReducers = combineReducers({ getPlayerValues });
export default allReducers;
