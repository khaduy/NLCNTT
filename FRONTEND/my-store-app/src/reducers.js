import {
  CHI_TIET_SP_THANH_CONG,
  CHI_TIET_SP_THAT_BAI,
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  DANG_XUAT,
  LIET_KE_SP_THANH_CONG,
  LIET_KE_SP_THAT_BAI,
  TANG_SO_LUONG_SP,
  GIAM_SO_LUONG_SP,
  YEU_CAU_CHI_TIET_SP,
  YEU_CAU_DANG_NHAP,
  YEU_CAU_LIET_KE_SP,
  YEU_CAU_THEM_GIO_HANG,
  YEU_CAU_XOA_GIO_HANG,
  DAT_HANG_THANH_CONG,
  DAT_HANG_THAT_BAI,
  YEU_CAU_DAT_HANG,
  DAT_HANG_RESET,
  GIO_HANG_RESET,
  POST_CMT_REQUEST,
  POST_CMT_SUCCESS,
  POST_CMT_FAIL,
  POST_CMT_RESET,
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

export const lietKeSanphamReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case YEU_CAU_LIET_KE_SP:
      return { loading: true };
    case LIET_KE_SP_THANH_CONG:
      return { loading: false, dsSanPham: action.payload };
    case LIET_KE_SP_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chiTietSanPhamReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case YEU_CAU_CHI_TIET_SP:
      return { loading: true };
    case CHI_TIET_SP_THANH_CONG:
      return { loading: false, chiTietSP: action.payload };
    case CHI_TIET_SP_THAT_BAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const themHangVaoGioReducer = (state = { dsGioHang: [] }, action) => {
  switch (action.type) {
    case YEU_CAU_THEM_GIO_HANG:
      const product = action.payload;
      // viet lai  logic
      const tontai = state.dsGioHang.find((item) => item.mshh === product.mshh);
      if (tontai) {
        // Nếu sản phẩm thêm vào đã tồn tại trong giỏ hàng => thay thế sản phẩm đã tồn tại này với sản phẩm có mshh trùng trong giỏ hàng => tại  vì sản
        // phẩm đã tồn tại này có thể mang số lượng sản phẩm mua (soluongmua) khác cái trong giỏ hàng, nên thay con mẹ nó luôn bằng sp mới này
        // Thay thế sản phẩm mới vào vị trí sản phẩm cũ
        return {
          ...state, // copy hết các phần tử trong mảng dsGioHang
          dsGioHang: state.dsGioHang.map((item) =>
            item.mshh === product.mshh ? product : item
          ), // dòng này kiểm tra nếu trong mảng dsGioHang có tồn tại thằng
          // phần tử mảng nào trùng mshh với tontai thì thay nó bằng totai, ngược lại giữ nguyên item
          // Thêm lộn, cái mới là product năm ở dòng 62, cái cũ là tontai nằm ở dòng 64
        };
      } else {
        // Ngược lại sản phẩm chưa có trong giỏ hàng => thêm mới vào
        return {
          ...state,
          dsGioHang: [...state.dsGioHang, product], // thêm product vào mảng dsGioHang
          // success: true
        };
      }

    case YEU_CAU_XOA_GIO_HANG:
      return {
        ...state,
        dsGioHang: state.dsGioHang.filter(
          (item) => item.mshh !== action.payload
        ),
      };

    case TANG_SO_LUONG_SP:
      return {
        ...state, // copy hết các phần tử trong mảng dsGioHang
        dsGioHang: state.dsGioHang.map((item) => {
          if (item.mshh === action.payload) {
            item.soluongmua = item.soluongmua + 1;
            return item;
          }
          // Nếu không có dòng else này, thì trong if kiểm tra item.mshh nào bằng với payload từ action truyền về thì return item đó, ngược lại không làm
          // j hết, thành ra chỉ những thằng có item.mshh == action.payload mới được xử lý, những thằng còn lại không được return nên khi bấm tăng số
          // lượng sản phẩm 1 cái thì những cái còn lại không được retủn nên vị trí tại phẩn tử mảng đó bị null
          // Đây: đó vậy đó.
          else {
            return item;
          }
        }),
      };
    case GIAM_SO_LUONG_SP:
      return {
        ...state,
        dsGioHang: state.dsGioHang.map((item) => {
          if (
            item.mshh === action.payload.mshh &&
            action.payload.soluongmua > 1
          ) {
            item.soluongmua = item.soluongmua - 1;
            return item;
          } else {
            return item;
          }
        }),
      };
    // return {
    //   ...state, // copy hết các phần tử trong mảng dsGioHang
    //  dsGioHang: state.dsGioHang.map(item => {
    //    if(item.mshh === action.payload) {
    //      item.soluongmua = item.soluongmua - 1;
    //      return item;
    //    }
    //    // Nếu không có dòng else này, thì trong if kiểm tra item.mshh nào bằng với payload từ action truyền về thì return item đó, ngược lại không làm
    //    // j hết, thành ra chỉ những thằng có item.mshh == action.payload mới được xử lý, những thằng còn lại không được return nên khi bấm tăng số
    //    // lượng sản phẩm 1 cái thì những cái còn lại không được retủn nên vị trí tại phẩn tử mảng đó bị null
    //    // Đây: đó vậy đó.
    //    else {
    //      return item;
    //    }
    //  })
    // }
    //=== reset gio hang
    case GIO_HANG_RESET:
      return {
        ...state,
        dsGioHang: []
      }

    default:
      return state;
  }
};

export const datHangReducer = (state = {}, action) => {
  switch (action.type) {
    case YEU_CAU_DAT_HANG:
      return { loading: true };
    case DAT_HANG_THANH_CONG:
      return { loading: false, successMsg: action.payload };
    case DAT_HANG_THAT_BAI:
      return { loading: false, error: action.payload };
    case DAT_HANG_RESET:
      return {
        ...state,
        successMsg: null
      }
    default:
      return state;
  }
};

export const commentPostReducer = (state = {}, action) => {
  switch(action.type) {
    case POST_CMT_REQUEST: 
      return { loading: true };
    case POST_CMT_SUCCESS:
      return { loading: false, createdCmt: action.payload }
    case POST_CMT_FAIL:
      return { loading: false, error: action.payload }
    case POST_CMT_RESET: 
      return {}
    default:
      return state;
  }
}