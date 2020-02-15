import api, { authHeaders } from "../../config";

export const UPDATE_DATA = "UPDATE_DATA";
export const UPDATE_TRACK_DETAILS = "UPDATE_TRACK_DETAILS";
export const ADD_ANOTHER_TRACK = "ADD_ANOTHER_TRACK";
export const REMOVE_TRACK = "REMOVE_TRACK";
export const RESET_STATE = "RESET_STATE";
const orderFeedbackPostUrl = "/orders/feedback";
const uploadTrackURI = "/orders/upload/track/";

export const updateOrderData = (payload) => (dispatch) =>
  dispatch({
    type: UPDATE_DATA,
    payload,
  });
export const updateTrackDetails = (payload, index) => (dispatch) =>
  dispatch({
    type: UPDATE_TRACK_DETAILS,
    payload,
    index,
  });

export const submitPayment = (paymentInfo) => {
  return fetch(`${api}${orderFeedbackPostUrl}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(paymentInfo),
  });
};

export const addAnotherTrack = () => ({ type: ADD_ANOTHER_TRACK });

export const removeTrack = (index) => ({ type: REMOVE_TRACK, payload: index });

export const uploadAudioFileToIPFS = (formData, feedbackId) =>
  fetch(`${api}${uploadTrackURI}${feedbackId}`, {
    method: "POST",
    body: formData,
  });

export const resetState = () => ({ type: RESET_STATE });
