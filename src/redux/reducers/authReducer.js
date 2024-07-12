// src/redux/reducers/authReducer.js
const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  role: null,
  userId: null,
  verificationStatus: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      };
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
