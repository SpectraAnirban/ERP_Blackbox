// src/redux/actions/authActions.js
export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: userData
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});