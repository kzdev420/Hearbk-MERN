import { ENUMS } from "../../utils";
import {
  UPDATE_DATA,
  UPDATE_TRACK_DETAILS,
  ADD_ANOTHER_TRACK,
  REMOVE_TRACK,
  RESET_STATE,
} from "../actions/orderActions";
import { GET_HISTORY_SUCCESS } from "../actions/userActions";

const initialTrackState = {
  mediaType: ENUMS.MEDIA_TYPE_YOUTUBE,
  selectedFeedback: 5,
  trackTitle: "",
  trackUrl: "",
  fileToUpload: undefined,
  genreId: undefined,
};

const initialState = {
  accountName: "",
  saveCardDetails: false,
  tracks: [{ ...initialTrackState, index: 0 }],
  orderHistory: {},
};

const updateTrack = (tracks, trackId, payload) =>
  tracks.map((track, index) =>
    index === trackId ? { ...track, ...payload } : track
  );

const addNewTrack = (tracks) => {
  const newTracks = [...tracks];

  newTracks.push({ ...initialTrackState, index: tracks.length + 1 });
  return newTracks;
};

const reducer = (state = initialState, { type, payload, ...action }) => {
  if (type === UPDATE_DATA) {
    return { ...state, ...payload };
  }
  if (type === UPDATE_TRACK_DETAILS) {
    return {
      ...state,
      tracks: updateTrack(state.tracks, action.index, payload),
    };
  }
  if (type === ADD_ANOTHER_TRACK) {
    return { ...state, tracks: addNewTrack(state.tracks) };
  }
  if (type === REMOVE_TRACK) {
    return {
      ...state,
      tracks: state.tracks.filter((track) => track.index !== payload),
    };
  }
  if (type === GET_HISTORY_SUCCESS) {
    return { ...state, orderHistory: payload, loading: false };
  }

  if (type === RESET_STATE) {
    return initialState;
  }
  return state;
};

export default reducer;
