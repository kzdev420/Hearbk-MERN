import api, { authHeaders } from "../../config";

export const GET_TRACKS_SUCCESS = "GET_TRACKS_SUCCESS";

const getTracksURI = "/discover/tracks";
const postTrackFeedback = "/discover/";

export const getTracksForDiscover = () => (dispatch) =>
  fetch(`${api}${getTracksURI}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_TRACKS_SUCCESS,
        payload: data,
      });
    });

export const postDiscoverFeedback = (payload) =>
    fetch (`${api}${postTrackFeedback}${payload.feedbackId}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });
