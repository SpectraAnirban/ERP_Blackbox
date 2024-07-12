// src/redux/transforms.js

import { createTransform } from 'redux-persist';

// Transform to exclude sensitive data
const authTransform = createTransform(
  // Transform state on its way to being serialized and persisted
  (inboundState, key) => {
    if (key === 'auth') {
      const { accessToken, refreshToken, ...rest } = inboundState;
      return rest;
    }
    return inboundState;
  },
  // Transform state being rehydrated
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ['auth'] }
);

export default authTransform;
