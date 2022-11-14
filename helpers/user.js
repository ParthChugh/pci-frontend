import { useContext } from 'react';
import { UserContext } from 'context/users/reducer';
import Cookies from 'js-cookie'
import * as UserActions from 'context/users/actions'

export const getUserDetails = () => {
  const {
    userState,
    userDispatch
  } = useContext(UserContext);
  if (JSON.stringify(userState?.user || {})?.length > 0 && new Date(userState?.user?.accessTokenExpiry) > new Date()) {
    return userState.user
  } else if (Cookies.get('userData')) {
    userDispatch(UserActions.updateUserDetails(JSON.parse(Cookies.get('userData'))))
    return JSON.parse(Cookies.get('userData'))
  } else {
    return { error: true }
  }
}