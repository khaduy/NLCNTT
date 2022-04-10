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
  DANG_XUAT,
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

export const dangNhapReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case YEU_CAU_DANG_NHAP:
      return { loading: true };
    case DANG_NHAP_THANH_CONG:
      return { loading: false, userInfo: action.payload };
    case DANG_NHAP_THAT_BAI:
      return { loading: false, error: action.payload };
    case DANG_XUAT:
      localStorage.removeItem("userInfo");
      return {};
    default:
      return state;
  }
};
export const chiTietDatHangReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case YEU_CAU_CHI_TIET_DH:
      return { loading: true };
    case CHI_TIET_DH_THANH_CONG:
      return { loading: false, chiTietDH: action.payload };
    case CHI_TIET_DH_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const capNhatDHReducer = (state = {}, action) => {
  switch (action.type) {
    case YEU_CAU_CAP_NHAT_DH:
      return { loading: true };
    case CAP_NHAT_DH_THANH_CONG:
      return { loading: false, trangthai: action.payload };
    case CAP_NHAT_DH_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const capNhatMKKHReducer = (state = {}, action) => {
  switch (action.type) {
    case YEU_CAU_CAP_NHAT_MKKH:
      return { loading: true };
    case CAP_NHAT_MKKH_THANH_CONG:
      return { loading: false, matkhau: action.payload };
    case CAP_NHAT_MKKH_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const capNhatTTNVReducer = (state = {}, action) => {
  switch (action.type) {
    case YEU_CAU_CAP_NHAT_TTNV:
      return { loading: true };
    case CAP_NHAT_TTNV_THANH_CONG:
      return { loading: false, thongtin: action.payload };
    case CAP_NHAT_TTNV_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const themSpReducer = (state = {}, action) => {
  switch (action.type) {
    case YEU_CAU_THEM_SP:
      return { loading: true };
    case THEM_SP_THANH_CONG:
      return { loading: false, infor: action.payload };
    case THEM_SP_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const capNhatSPReducer = (state = {}, action) => {
  switch (action.type) {
    case YEU_CAU_CAP_NHAT_SP:
      return { loading: true };
    case CAP_NHAT_SP_THANH_CONG:
      return { loading: false, thongtin: action.payload };
    case CAP_NHAT_SP_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};