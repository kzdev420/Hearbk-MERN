import { GET_TRACKS_SUCCESS } from "../actions/discoverActions";

const initialState = {
  tracks: [],
};

export default (state = initialState, action) => {
  const handlers = {
    [GET_TRACKS_SUCCESS]: { ...state, tracks: action.payload },
  };
  return handlers[action.type] || state;
};
