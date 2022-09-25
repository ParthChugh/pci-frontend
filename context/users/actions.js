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
