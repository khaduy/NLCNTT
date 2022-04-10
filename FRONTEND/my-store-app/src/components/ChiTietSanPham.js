import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { postComment, themGioHang, xemChiTietSanPham } from "../actions";
import "./css/Detail.css";
import "./css/cmt.css";
import { POST_CMT_RESET } from "../constants";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ChiTietSanPham(props) {
  const [qty, setQty] = useState(1);
  const chiTietSanPham = useSelector((state) => state.chiTietSanPham);
  const { loading, chiTietSP, error } = chiTietSanPham;
  const [cmt, setCmt] = useState();
  const [cmtList, setCmtList] = useState([]);
  const [cmtListLoading, setCmtListLoading] = useState(false);
  const [totalPages, setTotalPages] = useState([]);

  // totalpages calculation
  const totalPagesCalculate = (arrLength) => {
    const totalP = [];
    for (let i = 1; i <= Math.ceil(arrLength / 4); i++) {
      totalP.push(i);
    }
    setTotalPages(totalP);
  };

  // Lay thong tin khach hang
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  const commentPost = useSelector((state) => state.commentPost);
  const { loading: postCmtLoading, createdCmt } = commentPost;

  const mshh = props.match.params.mshh;

  const dispatch = useDispatch();

  const fetchCmtList = async () => {
    setCmtListLoading(true);
    const { data } = await axios.get(`/comments?productId=${mshh}`);
    setCmtListLoading(false);
    setCmtList(data);
    totalPagesCalculate(data.length);
  };

  useEffect(() => {
    fetchCmtList();
    dispatch(xemChiTietSanPham(mshh));
  }, [mshh]);

  const xuLyThemGioHang = () => {
    props.history.push(`/giohang/${mshh}?qty=${qty}`);
  };

  const handleCmtSubmit = (e) => {
    e.preventDefault();
    //Time calculate
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    // sdt, cmt. mshh
    const info = {
      sdt: userInfo.sdt,
      cmt,
      mshh,
      time: dateTime,
    };
    dispatch(postComment(info));
  };

  useEffect(() => {
    if (createdCmt) {
      alert("Đăng bình luận thành công!");
      dispatch({ type: POST_CMT_RESET });
      fetchCmtList();
    }
    setCmt("");
  }, [createdCmt]);

  const { page = 1 } = useParams();

  //=== Pagination
  const filterCmts = (commentList) => {
    // tong cong: 12 comment => so' trang max: 3
    // trang 1: 4 records => offset 0 , limit 4 = >slice (0, 4)
    // trang 2: 4 records => offset 4, limit 4 => slice(4, 8)
    // trang 3: 4 records => offset 8, litmit 4 => slice(8, 12)
    // cong thuc: offset = trang * 4 - 4 // vd: trang 1 = 1 * 4 - 4 = 0, trang 2 = 2*4-4 = 4
    // limit = trang * 4
    const firstParam = (page || 1) * 4 - 4; // Nếu ko có tham số page thì mặc định 1 => || 1
    const secondParam = (page || 1) * 4;
    return commentList.slice(firstParam, secondParam);
  };

  // tinh tong trang
  // const totalPages = [];

  const prevPage = (num) => {
    let myNum = Number(num);
    if (myNum === 1) {
      return "1";
    } else if (myNum > 1 && myNum <= totalPages.length) {
      return (myNum = myNum - 1);
    }
  };

  const nextPage = (num) => {
    let myNum = Number(num);
    if (myNum === totalPages.length) {
      return totalPages.length;
    } else if (myNum < totalPages.length) {
      return (myNum = myNum + 1);
    }
  };

  return (
    <div id="maincontent">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Có lỗi xảy ra</div>
      ) : (
        <div className="container" style={{ minWidth: "1500px" }}>
          <div className="col-md-12 bor">
            <section className="box_main1">
              <div
                className="col-md-6 text_center"
                style={{ maxWidth: "450px" }}
              >
                  <img
                    src={`/${chiTietSP[0].hinh}`}
                    className="img-responsive bor"
                    id="imgmain"
                    width="100%"
                    height="300px"
                    data-zoom-image="images/16-270x270.png"
                  />
              </div>
              <div className="col-md-3 bor" style={{ minWidth: "450px" }}>
                <ul id="right">
                  <li>
                    <h1>{`${chiTietSP[0].tenhh}`}</h1>
                  </li>
                  <li>
                    <b className="price">{`${chiTietSP[0].gia.toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}`}</b>
                  </li>
                  <form action="cart.php?action=add" method="POST">
                    <input
                      type="number"
                      defaultValue={1}
                      name="quantity[20001]"
                      style={{ width: "50px", marginTop: "5px" }}
                      min="1"
                      max={98}
                      onChange={(e) => setQty(e.target.value)}
                    />
                    <br />
                    <button
                      type="submit"
                      className="btn-grad"
                      style={{ marginTop: "15px" }}
                      onClick={xuLyThemGioHang}
                    >
                      {" "}
                      <i className="fa fa-shopping-basket" /> MUA NGAY
                    </button>
                  </form>
                  <div id="home" className="tab-pane fade in active">
                    <div className="rightInfo phone">
                      <ul className="policy ">
                        <li className="inpr">
                          <span>
                            Giao hàng miễn phí, nhanh chóng từ 2 đến 10 ngày.
                            <Link to="/chinhsachgiaohang">
                              {" "}
                              Xem chính sách
                            </Link>
                          </span>
                          {/* <span>Bộ sản phẩm gồm: <span style="color: #4c8e00;">Hộp, Sạc, Tai nghe, Sách hướng dẫn, Cáp, Cây lấy sim <i class="icondetail-camera standkit" href="#"></i></span></span> */}
                        </li>
                        <li className="wrpr">
                          <span>
                            Bảo hành chính hãng{" "}
                            <span style={{ color: "#4c8e00" }}>12 tháng</span>.
                          </span>
                        </li>
                        <li className="chpr">
                          Lỗi là đổi mới trong 1 tháng.
                          <Link to="/chinhsachdoitra">Xem chính sách</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </div>
              <div className="col-md-3 bor">
                <div
                  dangerouslySetInnerHTML={{ __html: chiTietSP[0].motahh }}
                />
              </div>
            </section>
            {/* <h3>THÔNG TIN SẢN PHẨM</h3> */}
            {/* <p>Hiện tại chưa có thông tin cho sản phẩm này</p> */}
            {/*  */}
          </div>
        </div>
      )}

      <section className="comment-sec container">
        <div className="title">Bình luận</div>
        <form onSubmit={handleCmtSubmit}>
          <div className="comment-box">
            <textarea value={cmt} onChange={(e) => setCmt(e.target.value)} />
            <div className="comment-btn">
              {postCmtLoading ? (
                <div>Posting...</div>
              ) : (
                <input type="submit" values="send" />
              )}
            </div>
          </div>
        </form>

        <div className="seperator"></div>

        {cmtListLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="render-cmts">
            {filterCmts(cmtList).map((cmt) => (
              <div className="cmt">
                <div className="author d-flex align-items-center">
                  <img src="/images/profile.png" alt="" />
                  <span>{cmt.hoten}</span>
                </div>
                <div className="time">{cmt.time}</div>
                <div className="content">
                  <p>{cmt.cmt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pagination">
          <ul>
            <li>
              <Link to={`/sanpham/${mshh}/comments/page/${prevPage(page)}`}>
                Prev
              </Link>
            </li>
            {totalPages.map((item) => (
              <li className={item === Number(page) ? "active" : ""}>
                <Link to={`/sanpham/${mshh}/comments/page/${item}`}>
                  {item}
                </Link>
              </li>
            ))}

            <li>
              <Link to={`/sanpham/${mshh}/comments/page/${nextPage(page)}`}>
                Next
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ChiTietSanPham;
