import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import { authLoginReducer, authRegisterReducer } from "./auth/reducers";
import {
  createSingleUserReducer,
  deleteSingleUserReducer,
  getSingleUserReducer,
  getUsersReducer,
  updateSingleUserReducer,
} from "./users/reducers";

// middleware
const middlewares = [thunk];

const combinedReducer = combineReducers({
  //auth
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  // products
  getUsers: getUsersReducer,
  getSingleUser: getSingleUserReducer,
  createUser: createSingleUserReducer,
  updateUser: updateSingleUserReducer,
  deleteUser: deleteSingleUserReducer,
});

const initalState = {};

export const store = createStore(
  combinedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
