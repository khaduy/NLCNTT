import {
  CAP_NHAT_DH_THANH_CONG,
  CAP_NHAT_DH_THAT_BAI,
  CAP_NHAT_MKKH_THANH_CONG,
  CAP_NHAT_MKKH_THAT_BAI,
  CAP_NHAT_SP_THANH_CONG,
  CAP_NHAT_SP_THAT_BAI,
  CAP_NHAT_TTNV_THANH_CONG,
  CAP_NHAT_TTNV_THAT_BAI,
  CHI_TIET_DH_THANH_CONG,
  CHI_TIET_DH_THAT_BAI,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  THEM_NV_THANH_CONG,
  THEM_NV_THAT_BAI,
  THEM_SP_THANH_CONG,
  THEM_SP_THAT_BAI,
  YEU_CAU_CAP_NHAT_DH,
  YEU_CAU_CAP_NHAT_MKKH,
  YEU_CAU_CAP_NHAT_SP,
  YEU_CAU_CAP_NHAT_TTNV,
  YEU_CAU_CHI_TIET_DH,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_THEM_NV,
  YEU_CAU_THEM_SP,
} from "./constants";
import Axios from "axios";

export const dangNhapAdmin = (usernames, passwords) => async (dispatch) => {
  dispatch({ type: YEU_CAU_DANG_NHAP });
  const { data } = await Axios.post("/login", { usernames, passwords });
  if (data) {
    dispatch({ type: DANG_NHAP_THANH_CONG, payload: data });
    localStorage.setItem("userInfo", JSON.stringify({ userInfo: data })); //Bien doi thanh chuoi
  } else {
    dispatch({ type: DANG_NHAP_THAT_BAI, payload: "đăng nhập thất bại" });
    alert("Thông tin đăng nhập không chính xác!!!");
  }
};

export const xemChiTietDatHang = (dh_id) => async (dispatch) => {
  dispatch({ type: YEU_CAU_CHI_TIET_DH });
  try {
    const { data } = await Axios.get(`/orderdetail/${dh_id}`);
    dispatch({ type: CHI_TIET_DH_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: CHI_TIET_DH_THAT_BAI, payload: error.message });
  }
};

export const capNhatDH = (info) => async (dispatch) => {
  dispatch({ type: YEU_CAU_CAP_NHAT_DH });
  try {
    const { data } = await Axios.post("/trangthai", info);
    dispatch({ type: CAP_NHAT_DH_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: CAP_NHAT_DH_THAT_BAI, payload: error.message });
  }
};

export const capNhatMKKH = (info) => async (dispatch) => {
  dispatch({ type: YEU_CAU_CAP_NHAT_MKKH });
  try {
    const { data } = await Axios.post("/khediting", info);
    dispatch({ type: CAP_NHAT_MKKH_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: CAP_NHAT_MKKH_THAT_BAI, payload: error.message });
  }
};

export const capNhatTTNV = (info) => async (dispatch) => {
  dispatch({ type: YEU_CAU_CAP_NHAT_TTNV });
  try {
    const { data } = await Axios.post("/nvediting", info);
    dispatch({ type: CAP_NHAT_TTNV_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: CAP_NHAT_TTNV_THAT_BAI, payload: error.message });
  }
};

export const themSp = (info) => async (dispatch) => {
  dispatch({ type: YEU_CAU_THEM_SP });
  console.log("@@@@", info)
  try {
    const { data } = await Axios.post("/add", info);
    dispatch({ type: THEM_SP_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: THEM_SP_THAT_BAI, payload: error.message });
  }
};

export const capNhatSP = (info) => async (dispatch) => {
  dispatch({ type: YEU_CAU_CAP_NHAT_SP });
  try {
    const { data } = await Axios.put("/edithanghoa", info);
    dispatch({ type: CAP_NHAT_SP_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: CAP_NHAT_SP_THAT_BAI, payload: error.message });
  }
};