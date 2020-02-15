import history from "../../history";
import api, { genericHeaders, authHeaders } from "../../config";
import { toast } from "react-toastify";

const postRegisterUserURI = "/users/register";
const postAuthenticateUserURI = "/users/authenticate";
const postPreferencesURI = "/users";
const getOrderHistoryUrl = "/orders/history";
const getUserDetailsURI = "/users/details";
const uploadDisplayPicURI = "/users/upload/profile-image";
const getPaymentMethodURI = "/users/paymentMethods";
const getTokenDetailsURI = "/users/token";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const GET_HISTORY_SUCCESS = "GET_HISTORY_SUCCESS";
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS";
export const GET_USER_DETAILS_FAILURE = "GET_USER_DETAILS_FAILURE";
export const GET_USER_PAYMENT_METHODS_SUCCESS =
  "GET_USER_PAYMENT_METHODS_SUCCESS";

export const REMOVE_USER_PAYMENT_METHOD = "REMOVE_USER_PAYMENT_METHOD";

export const registerUserAction = (requestData, file) => (dispatch) =>
  fetch(`${api}${postRegisterUserURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify({
      email: requestData.email,
      password: requestData.password,
      display_name: requestData.displayName,
      user_name: requestData.username,
    }),
  })
    .then((response) => {
      if (response.status === 401) {
        toast.error("User already exits");
        return undefined;
      }
      if (response.ok) {
        if (!file) {
          toast.success("User registered sucessfully. Please login");
        }
        return response.json();
      } else {
        throw Error;
      }
    })
    .then(async (data) => {
      if (file && data) {
        const res = await uploadUserProfile(file, data.id);
        if (res.ok) {
          toast.success("User registered sucessfully. Please login");
        } else {
          toast.error("Profile image upload failed");
        }
      }
    });

export const authenticateUser = (requestData) => (dispatch) =>
  fetch(`${api}${postAuthenticateUserURI}`, {
    method: "POST",
    headers: genericHeaders(),
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        toast.error("Login failed ! Please check credentials!!");
        return undefined;
      }
    })
    .then((data) => {
      if (data) {
        const {
          token,
          isFirstUserLogin,
          isPremiumUser,
          expireTime = 3600000,
        } = data;
        localStorage.setItem("x-access-token", token);
        if (isPremiumUser) {
          localStorage.setItem("isPremiumUser", String(isPremiumUser));
        }
        if (isFirstUserLogin) {
          localStorage.setItem("isFirstUserLogin", String(isFirstUserLogin));
        }
        setTimeout(() => {
          localStorage.removeItem("x-access-token");
          localStorage.removeItem("isPremiumUser");
        }, expireTime);
        history.push(isFirstUserLogin ? "/preferences" : "/discover");
        dispatch({ type: AUTHENTICATE_USER_SUCCESS, payload: token });
      }
    });

export const uploadUserProfile = (fileToUpload, id) => {
  const formData = new FormData();
  formData.append("profileImage", fileToUpload);
  return fetch(`${api}${uploadDisplayPicURI}/${id}`, {
    method: "POST",
    body: formData,
  });
};

export const postListenerPreferences = (payload) => (dispatch) => {
  const requestHeaders = authHeaders();
  return fetch(`${api}${postPreferencesURI}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(payload),
  }).then((res) => {
    if (res.ok) {
      dispatch(getUserDetails());
      localStorage.removeItem("isFirstUserLogin");
      toast.success("Changes saved successfully !!!");
    } else {
      toast.error("Failed to save changes !!!");
    }
  });
};

export const getOrderHistory = () => (dispatch) =>
  fetch(`${api}${getOrderHistoryUrl}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((requestData) => {
      dispatch({
        type: GET_HISTORY_SUCCESS,
        payload: requestData,
      });
    });

export const getUserDetails = () => (dispatch) =>
  fetch(`${api}${getUserDetailsURI}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((requestData) => {
      dispatch({
        type: GET_USER_DETAILS_SUCCESS,
        payload: requestData
      });
    });

// update user details action starts here

export const updateUserData = () => (dispatch) => 
  fetch(`${api}${getUserDetailsURI}`, {
    method: "PATCH",
    header: authHeaders()
  })
    .then((res) => res.json())
    .then((requestData) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: requestData
      });
    });

// ends here

export const getPaymentMethods = () => (dispatch) =>
  fetch(`${api}${getPaymentMethodURI}`, {
    method: "GET",
    headers: authHeaders(),
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: GET_USER_PAYMENT_METHODS_SUCCESS,
        payload: data,
      })
    );

export const deletePaymentMethod = (paymentInfo) => (dispatch) => {
  return fetch(`${api}${getPaymentMethodURI}`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify(paymentInfo),
  }).then((res) => {
    if (res.ok) {
      dispatch(getPaymentMethods());
    }
  });
};

export const getTokenDetails = (token) => 
  fetch(`${api}${getTokenDetailsURI}`, {
    method: "GET",
    headers: authHeaders(),
  });