import {
  CHI_TIET_SP_THANH_CONG,
  CHI_TIET_SP_THAT_BAI,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DAT_HANG_RESET,
  DAT_HANG_THANH_CONG,
  DAT_HANG_THAT_BAI,
  GIAM_SO_LUONG_SP,
  GIO_HANG_RESET,
  LIET_KE_SP_THANH_CONG,
  LIET_KE_SP_THAT_BAI,
  POST_CMT_FAIL,
  POST_CMT_REQUEST,
  POST_CMT_SUCCESS,
  TANG_SO_LUONG_SP,
  THEM_GIO_HANG_THAT_BAI,
  YEU_CAU_CHI_TIET_SP,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_DAT_HANG,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_THEM_GIO_HANG,
  YEU_CAU_XOA_GIO_HANG,
} from "./constants";
import Axios from "axios";

export const dangNhapKhangHang = (sdt, pass) => async (dispatch) => {
  dispatch({ type: YEU_CAU_DANG_NHAP });
  const { data } = await Axios.post("/dangnhap", { sdt, pass });
  if (data) {
    dispatch({ type: DANG_NHAP_THANH_CONG, payload: data });
    localStorage.setItem("userInfo", JSON.stringify({ userInfo: data })); //Bien doi thanh chuoi
  } else {
    dispatch({ type: DANG_NHAP_THAT_BAI, payload: "đăng nhập thất bại" });
    alert("Thông tin đăng nhập không chính xác!!!");
  }
  // try {
  //   const { data } = await Axios.post("/dangnhap", { sdt, pass });
  //   dispatch({ type: DANG_NHAP_THANH_CONG, payload: data });
  //   localStorage.setItem("userInfo", JSON.stringify({ userInfo: data })); //Bien doi thanh chuoi
  // } catch (error) {
  //   dispatch({ type: DANG_NHAP_THAT_BAI, payload: error.message });
  // }
};

export const lietKeSP = () => async (dispatch) => {
  dispatch({ type: YEU_CAU_LIET_KE_SP });
  try {
    const { data } = await Axios.get("/dssanpham");
    dispatch({ type: LIET_KE_SP_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: LIET_KE_SP_THAT_BAI, payload: error.message });
  }
};

export const xemChiTietSanPham = (mshh) => async (dispatch) => {
  dispatch({ type: YEU_CAU_CHI_TIET_SP });
  try {
    const { data } = await Axios.get(`/sanpham/${mshh}`);
    dispatch({ type: CHI_TIET_SP_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: CHI_TIET_SP_THAT_BAI, payload: error.message });
  }
};

export const themGioHang = (mshh, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(`/sanpham/${mshh}`);
    console.log(data);
    dispatch({
      type: YEU_CAU_THEM_GIO_HANG,
      payload: {
        gia: data[0].gia,
        hinh: `${data[0].hinh}`,
        manhom: data[0].manhom,
        motahh: data[0].motahh,
        mshh: data[0].mshh,
        soluonghang: data[0].soluonghang,
        tenhh: data[0].tenhh,
        soluongmua: Number(qty),
      },
    });
    // Luu vao local storage
    localStorage.setItem(
      "dsGioHang",
      JSON.stringify(getState().themHangVaoGio.dsGioHang)
    );
  } catch (error) {
    dispatch({ type: THEM_GIO_HANG_THAT_BAI, payload: error.message });
  }
};

export const xoaGioHang = (mshh) => (dispatch, getState) => {
  dispatch({ type: YEU_CAU_XOA_GIO_HANG, payload: mshh });
  // Luu thay doi vao local storage
  localStorage.setItem(
    "dsGioHang",
    JSON.stringify(getState().themHangVaoGio.dsGioHang)
  );
};

export const resetGioHang = () => (dispatch, getState) => {
  dispatch({ type: GIO_HANG_RESET });
  // Luu thay doi vao local storage
  localStorage.setItem(
    "dsGioHang",
    JSON.stringify(getState().themHangVaoGio.dsGioHang)
  );
};

export const luuDathang = (donhang) => async (dispatch) => {
  dispatch({ type: YEU_CAU_DAT_HANG });
  try {
    const { data } = await Axios.post("/dathang", donhang);
    dispatch({ type: DAT_HANG_THANH_CONG, payload: data });
  } catch (error) {
    dispatch({ type: DAT_HANG_THAT_BAI, payload: error.message });
  }
};

export const postComment = (info) => async (dispatch) => {
  dispatch({ type: POST_CMT_REQUEST });
  try {
    const { data } = await Axios.post("/comments", info);
    dispatch({ type: POST_CMT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_CMT_FAIL, payload: error.message });
  }
};
