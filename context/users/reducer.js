import React, { useReducer, createContext } from 'react';
import * as types from './types'

const initialState = {
  user: {},
  businessDetails: {},
};

const userReducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_USER_RESPONSE:
      return {
        ...state,
        user: action.payload,
      };
    case types.UPDATE_BUSNIESS_DETAILS:
      return {
        ...state,
        businessDetails: action.payload,
      };
    default:
      return state;
  }
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
