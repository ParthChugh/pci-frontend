import * as actionTypes from "./types";

export const updateUserDetails = (data) => {
  return {
    type: actionTypes.UPDATE_USER_RESPONSE,
    payload: data,
  };
}

export const updateBusinessDetails = (data) => {
  return {
    type: actionTypes.UPDATE_BUSNIESS_DETAILS,
    payload: data,
  };
}

export const updateProducts = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS_PAGE,
    payload: data,
  };
}

export const setLoading = (data) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: data,
  };
}
