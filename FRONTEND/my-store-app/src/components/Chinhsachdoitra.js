import React, { Component } from 'react';

class Chinhsachdoitra extends Component {
    render() {
        return (
            <div style={{width: '1000px', margin: '20px 60px 50px 80px'}}>
                <h4 style={{fontWeight: 'bold'}}>1. Sản phẩm lỗi do nhà sản xuất:</h4>
                <h5 style={{fontWeight: 'bold'}}>Tháng 1: </h5>
                <p>	
                    1 đổi 1 (cùng mẫu, cùng màu, cùng dung lượng...) .<br />
                    Trường hợp sản phẩm đổi hết hàng, khách hàng có thể đổi sang sản phẩm khác cùng nhóm hàng có giá trị lớn hơn 50% giá trị sản phẩm lỗi (KTD SHOP sẽ hoàn tiền phần chênh lệch cho khách hàng). <br />
                    Hoặc: khách hàng trả máy &amp; KTD SHOP hoàn lại tiền với mức giá bằng 80% giá trên hoá đơn.
                </p>
                <h5 style={{fontWeight: 'bold'}}>Tháng 2 - 12:</h5>
                <p>
                    Gửi máy bảo hành theo quy định của hãng. <br />
                    Hoặc: Khách hàng trả máy &amp; KTD SHOP hoàn lại tiền và thu phí thêm 5% so với mức hoàn tiền khi trả ở tháng thứ 1. <br />
                    VD: Ở tháng thứ nhất, nếu khách hàng trả sản phẩm sẽ được hoàn lại tiền với mức giá bằng 80% thì sang tháng thứ 2 nếu khách hàng trả máy sẽ thu phí thêm 5% nên mức hoàn tiền sẽ còn 75% giá trị sản phẩm trên hoá đơn, tháng thứ 3 mức hoàn tiền sẽ trừ thêm 5% thành 70%....
                </p>
                <h4 style={{fontWeight: 'bold'}}>2. Sản phẩm không lỗi (không phù hợp với nhu cầu của khách hàng):</h4>
                <h5 style={{fontWeight: 'bold'}}>Tháng 1: </h5>
                <p>
                    Hoàn lại tiền máy với giá bằng 80% giá trên hoá đơn. <br />
                </p><h5 style={{fontWeight: 'bold'}}>Tháng 2 - 12 : </h5>
                Hoàn lại tiền với mức phí thêm 5% so với tháng thứ 1 (80%). VD: tháng thứ 2 hoàn lại tiền với mức giá 75% giá trên hoá đơn, tháng thứ 3 là 70%...
                <p />
                <h4 style={{fontWeight: 'bold'}}>3. Sản phẩm lỗi do người sử dụng:</h4>
                <p>
                    &gt; Không đủ điều kiện bảo hành theo qui định của hãng. <br />
                    &gt; Máy không giữ nguyên 100% hình dạng ban đầu. <br />
                    &gt; Màn hình bị trầy xước. <br />
                    =&gt; Không áp dụng bảo hành, đổi trả. KTD SHOP hỗ trợ chuyển bảo hành, khách hàng chịu chi phí sửa chữa.
                </p>
            </div>
        );
    }
}

export default Chinhsachdoitra;