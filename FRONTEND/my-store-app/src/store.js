import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  chiTietSanPhamReducer,
  commentPostReducer,
  dangNhapReducer,
  datHangReducer,
  lietKeSanphamReducer,
  themHangVaoGioReducer,
} from "./reducers";

const reducer = combineReducers({
  dangNhap: dangNhapReducer,
  lietKeSanPham: lietKeSanphamReducer,
  chiTietSanPham: chiTietSanPhamReducer,
  themHangVaoGio: themHangVaoGioReducer,
  dathang: datHangReducer,
  commentPost: commentPostReducer
});

const initialState = {
  dangNhap: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "",
  themHangVaoGio: {
    dsGioHang: localStorage.getItem("dsGioHang")
      ? JSON.parse(localStorage.getItem("dsGioHang"))
      : [],
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
