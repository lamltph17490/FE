import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <div className="container">
      {/* <div className="clearfix" style={{ paddingBottom: "1rem" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/tryitnow/">
            VNPAY DEMO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link " href="/tryitnow/">
                  Danh sách{" "}
                </a>{" "}
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link active" href="/tryitnow/Home/CreateOrder">
                  Tạo mới <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div> */}
      <h3>Tạo mới đơn hàng</h3>
      <div className="table-responsive">
        <form action="/tryitnow/Home/CreateOrder" id="frmCreateOrder" method="post">
          {" "}
          <div className="form-group">
            <label htmlFor="Amount">Số tiền</label>
            <input
              className="form-control"
              data-val="true"
              data-val-number="The field Amount must be a number."
              data-val-required="The Amount field is required."
              id="Amount"
              name="Amount"
              type="text"
              defaultValue={10000}
            />
          </div>
          <div className="form-group">
            <label htmlFor="OrderDescription">Nội dung thanh toán</label>
            <textarea
              className="form-control"
              cols={20}
              id="OrderDescription"
              name="OrderDescription"
              rows={2}
              defaultValue={"Thanh toan don hang thoi gian: 2022-12-21 18:33:09"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bankcode">Ngân hàng</label>
            <select name="bankcode" id="bankcode" className="form-control">
              <option value>Không chọn </option>
              <option value="MBAPP">Ung dung MobileBanking</option>
              <option value="VNPAYQR">VNPAYQR</option>
              <option value="VNBANK">LOCAL BANK</option>
              <option value="IB">INTERNET BANKING</option>
              <option value="ATM">ATM CARD</option>
              <option value="INTCARD">INTERNATIONAL CARD</option>
              <option value="VISA">VISA</option>
              <option value="MASTERCARD"> MASTERCARD</option>
              <option value="JCB">JCB</option>
              <option value="UPI">UPI</option>
              <option value="VIB">VIB</option>
              <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
              <option value="SCB">Ngan hang SCB</option>
              <option value="NCB">Ngan hang NCB</option>
              <option value="SACOMBANK">Ngan hang SacomBank</option>
              <option value="EXIMBANK">Ngan hang EximBank </option>
              <option value="MSBANK">Ngan hang MSBANK </option>
              <option value="NAMABANK">Ngan hang NamABank </option>
              <option value="VNMART"> Vi dien tu VnMart</option>
              <option value="VIETINBANK">Ngan hang Vietinbank</option>
              <option value="VIETCOMBANK">Ngan hang VCB </option>
              <option value="HDBANK">Ngan hang HDBank</option>
              <option value="DONGABANK">Ngan hang Dong A</option>
              <option value="TPBANK">Ngân hàng TPBank </option>
              <option value="OJB">Ngân hàng OceanBank</option>
              <option value="BIDV">Ngân hàng BIDV </option>
              <option value="TECHCOMBANK">Ngân hàng Techcombank </option>
              <option value="VPBANK">Ngan hang VPBank </option>
              <option value="AGRIBANK">Ngan hang Agribank </option>
              <option value="MBBANK">Ngan hang MBBank </option>
              <option value="ACB">Ngan hang ACB </option>
              <option value="OCB">Ngan hang OCB </option>
              <option value="IVB">Ngan hang IVB </option>
              <option value="SHB">Ngan hang SHB </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="language">Ngôn ngữ</label>
            <select name="language" id="language" className="form-control">
              <option value="vn">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          {/*<button type="submit" class="btn btn-default" id="btnPopup">Thanh toán Popup</button>*/}
          <button type="submit" className="btn-primary">
            Thanh toán Redirect
          </button>
          <input
            name="__RequestVerificationToken"
            type="hidden"
            defaultValue="TAPITJcy3gARPFLivljfmx0B5ar57jRr18E9tLcdgTcFu27_WLzV6NPMCcJv_R_oVaAfD2bhOctDQWWl7zwZwQSmh9TbLHOJdH1rzVufRQ41"
          />
        </form>
      </div>
      <p>&nbsp;</p>
      <footer className="footer">
        <p>© VNPAY 2022</p>
      </footer>
    </div>
  );
};

export default index;
