import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import { authLoginReducer, authRegisterReducer } from "./auth/reducers";
import {
  createSingleItemReducer,
  deleteSingleItemReducer,
  getItemsReducer,
  getSingleItemReducer,
  updateSingleItemReducer,
} from "./items/reducers";

// import rootReducer from "./reducers";

// middleware
const middlewares = [thunk];

const combinedReducer = combineReducers({
  //auth
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  // products
  getItems: getItemsReducer,
  getSingleItem: getSingleItemReducer,
  createItem: createSingleItemReducer,
  updateItem: updateSingleItemReducer,
  deleteItem: deleteSingleItemReducer,
});

// initial states here
const initalState = {};

// creating store
export const store = createStore(
  combinedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
