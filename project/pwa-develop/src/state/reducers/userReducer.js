import {
  REGISTER_USER_SUCCESS,
  AUTHENTICATE_USER_SUCCESS,
  GET_USER_DETAILS_SUCCESS,
  UPDATE_USER_SUCCESS,
  GET_HISTORY_SUCCESS,
  GET_USER_PAYMENT_METHODS_SUCCESS,
} from "../actions/userActions";

const initialState = {
  user: {},
  authToken: undefined,
  error: false,
  isPremiumUser: false,
  paymentMethods: [],
};

const reducer = (state = initialState, { type, payload }) => {
  const handlers = {
    [REGISTER_USER_SUCCESS]: { ...state, user: payload },
    [AUTHENTICATE_USER_SUCCESS]: { ...state, authToken: payload },
    [GET_USER_DETAILS_SUCCESS]: { ...state, user: payload },
    [UPDATE_USER_SUCCESS]: { ...state, user: payload },
    [GET_HISTORY_SUCCESS]: { ...state, user: payload },
    [GET_USER_PAYMENT_METHODS_SUCCESS]: { ...state, paymentMethods: payload },
  };
  return handlers[type] || state;
};

export default reducer;
