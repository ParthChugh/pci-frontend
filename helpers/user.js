import { useContext } from 'react';
import { UserContext } from 'context/users/reducer';
import Cookies from 'js-cookie'
import axios from 'axios';
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

export const addProductToBasket = async ({ productId, quantity, priceId, userData }) => {
  const params = new URLSearchParams();
  if (userData.error === true) return { error: "User Not autherized" }
  params.append("ProductId", productId);
  params.append("qty", quantity);
  params.append("ProductFixedPriceId", priceId);
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/cart`, params, {
    headers: {
      Authorization: `Bearer ${userData.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // withCredentials: true
  })
    .then((response) => response.data)
    .catch((response) => response)
}

export const updateCart = async ({ cartId, productId, quantity, userData }) => {
  const params = new URLSearchParams();
  if (userData.error === true) return { error: "User Not autherized" }
  params.append("ProductId", productId);
  params.append("qty", quantity);
  return axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/cart/${cartId}`, params, {
    headers: {
      Authorization: `Bearer ${userData.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // withCredentials: true
  })
    .then((response) => response)
    .catch((response) => response)
}

export const deleteCart = async ({ cartId, productId, quantity, userData }) => {
  if (userData.error === true) return { error: "User Not autherized" }

  return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/cart/${cartId}?ProductId=${productId}`, {
    headers: {
      Authorization: `Bearer ${userData.accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // withCredentials: true
  })
    .then((response) => response)
    .catch((response) => response)
}

export const createCheckoutProcess = async ({ data, userData }) => {
  if (userData.error === true) return { error: "User Not autherized" }

  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/checkout`, data, {
    headers: {
      Authorization: `Bearer ${userData.accessToken}`,
      "Content-Type": "application/json"
    },
  })
    .then((response) => response)
    .catch((response) => response)
}
