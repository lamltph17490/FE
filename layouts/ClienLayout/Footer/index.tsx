import React from "react";

type Props = {};

const Footer = (props: Props) => {

  return <section className="footer w-full mx-auto ">
  <hr className="w-full mb-[40px]" />
  <div className="w-[1410px] mx-auto flex">
    <div className="flex ml-[50px]">
      <div className="mr-[142px]">
        <h3 className="mb-[15px]">LIÊN HỆ</h3>
        <span>
          <a href="">Twiter</a>{" "}
        </span>
        <br />
        <span>
          <a href="">Facebook</a>{" "}
        </span>
        <br />
        <span>Instagram</span>
        <br />
        <span>Pinterest</span>
        <br />
        <span>Jobs</span>
      </div>
      <div className="">
        <h3 className="mb-[15px]">HỖ TRỢ</h3>
        <span className=""> Trợ Giúp Trả Lời </span>
        <br />
        <span className="">Đơn Hàng Của Bạn</span>
        <br />
        <span className="">Vận Chuyển</span>
        <br />
        <span>Hoàn hàng</span>
        <br />
        <span className="pt-[30px]">Liên Hệ Hỗ Trợ</span>
      </div>
    </div>
    <div className="mx-auto">
      <img src="./img/logoblack 1.png" alt="" className="mt-[50px]" />
      <div className="flex space-x-[32px] mt-[14px]">
        <i className="fa-brands fa-facebook-f" />
        <i className="fa-brands fa-google" />
        <i className="fa-brands fa-twitter" />
        <i className="fa-brands fa-pinterest-p" />
      </div>
    </div>
    <div className="w-[330px]">
      <h3>THÔNG TIN</h3>
      <p className="py-[18px] font-normal">
      Nhập email của bạn dưới đây để là người đầu tiên biết về bộ sưu tập và sản phẩm mới nhất.
      </p>
      <div className="flex">
        <input
          type="email"
          placeholder="Your email..."
          className="border border-[#E5E5E5 ] h-[54px] w-[251px] mr-[4px]"
        />
        <div className="bg-black w-[74px] h-[54px]">
          <i
            className="fa-regular fa-envelope px-[22px] py-[14px]"
            style={{ color: "#f9f3f3", fontSize: 30 }}
          />
        </div>
      </div>
    </div>
  </div>
  <hr className="w-full mt-[30px]" />
  <div className="pay h-[40px]"></div>
</section>
;
};

export default Footer;
