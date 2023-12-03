import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import { authLoginReducer } from "./auth/reducers";
import { getUsersReducer } from "./users/reducers";

// middleware
const middlewares = [thunk];

const combinedReducer = combineReducers({
  // auth
  authLogin: authLoginReducer,
  // users
  getUsers: getUsersReducer,
});

const initalState = {};

export const store = createStore(
  combinedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
