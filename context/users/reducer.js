import React, { useReducer, createContext } from 'react';
import * as types from './types'

const initialState = {
  user: {},
  businessDetails: {},
  products: {
    main: {}
  },
  loading: false
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
    case types.GET_PRODUCTS_PAGE:
      state.products[action.payload.categoryId] = action?.payload?.clear ? {} : { ...(state.products[action.payload.categoryId] || {}), ...(action.payload.products || {}) }
      return {
        ...state,
        products: state.products
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload
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
