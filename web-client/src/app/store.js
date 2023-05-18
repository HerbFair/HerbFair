import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import cakeReducer from "../features/cake/cakeSlice";
import iceCreamReducer from "../features/ice-cream/iceCreamSlice";

// const fetchUsers = require('../features/user/userSlice').fetchUsers
// const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
