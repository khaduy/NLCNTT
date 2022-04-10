import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  dangNhapReducer,
  chiTietDatHangReducer,
  capNhatDHReducer,
  capNhatMKKHReducer,
  capNhatTTNVReducer,
  themSpReducer,
  capNhatSPReducer,
} from "./reducers";

const reducer = combineReducers({
  dangNhap: dangNhapReducer,
  chiTietDatHang: chiTietDatHangReducer,
  capNhatDH: capNhatDHReducer,
  capNhatMKKH: capNhatMKKHReducer,
  capNhatTTNV: capNhatTTNVReducer,
  themSp: themSpReducer,
  capNhatSP: capNhatSPReducer,
});

const initialState = {
  dangNhap: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "",
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
