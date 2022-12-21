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
            <a href="" className="text-black">Twiter</a>{" "}
          </span>
          <br />
          <span>
            <a href="" className="text-black">Facebook</a>{" "}
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
            placeholder="Email của bạn..."
            className="border border-[#E5E5E5 ] h-[54px] w-[251px] mr-[4px] pl-[10px]"
          />
          <div className="bg-black w-[74px] h-[54px]">
            <button className="place-items-center">
              <svg className="mt-[17px] ml-[22px]" width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.1429 18.5357V7.39286C23.8333 7.74107 23.4996 8.06027 23.1417 8.35045C20.5495 10.343 18.4892 11.9777 16.9609 13.2545C16.4676 13.6704 16.0662 13.9944 15.7567 14.2266C15.4472 14.4587 15.0264 14.6957 14.4944 14.9375C13.9721 15.1696 13.4788 15.2857 13.0145 15.2857H13H12.9855C12.5212 15.2857 12.0231 15.1696 11.4911 14.9375C10.9688 14.6957 10.5528 14.4587 10.2433 14.2266C9.93378 13.9944 9.53237 13.6704 9.03906 13.2545C7.51079 11.9777 5.45052 10.343 2.85826 8.35045C2.50037 8.06027 2.16667 7.74107 1.85714 7.39286V18.5357C1.85714 18.6615 1.90067 18.7727 1.98772 18.8694C2.08445 18.9565 2.19568 19 2.32143 19H23.6786C23.8043 19 23.9107 18.9565 23.9978 18.8694C24.0945 18.7727 24.1429 18.6615 24.1429 18.5357ZM24.1429 3.28683C24.1429 3.26748 24.1429 3.21429 24.1429 3.12723C24.1429 3.04018 24.1429 2.97731 24.1429 2.93861C24.1429 2.89025 24.138 2.82738 24.1283 2.75C24.1283 2.66295 24.1138 2.60007 24.0848 2.56138C24.0655 2.52269 24.0413 2.47917 24.0123 2.4308C23.9833 2.38244 23.9397 2.34859 23.8817 2.32924C23.8237 2.30022 23.756 2.28571 23.6786 2.28571H2.32143C2.19568 2.28571 2.08445 2.33408 1.98772 2.4308C1.90067 2.51786 1.85714 2.62426 1.85714 2.75C1.85714 4.375 2.56808 5.74851 3.98996 6.87054C5.85677 8.34077 7.79613 9.87388 9.80804 11.4699C9.86607 11.5182 10.0353 11.6633 10.3158 11.9051C10.5964 12.1373 10.8188 12.3162 10.9833 12.442C11.1477 12.5677 11.3605 12.7225 11.6217 12.9062C11.8925 13.0804 12.1391 13.2109 12.3616 13.298C12.5841 13.385 12.792 13.4286 12.9855 13.4286H13H13.0145C13.208 13.4286 13.4159 13.385 13.6384 13.298C13.8609 13.2109 14.1027 13.0804 14.3638 12.9062C14.6347 12.7225 14.8523 12.5677 15.0167 12.442C15.1812 12.3162 15.4036 12.1373 15.6842 11.9051C15.9647 11.6633 16.1339 11.5182 16.192 11.4699C18.2039 9.87388 20.1432 8.34077 22.01 6.87054C22.5324 6.45461 23.016 5.89844 23.4609 5.20201C23.9156 4.49591 24.1429 3.85751 24.1429 3.28683ZM26 2.75V18.5357C26 19.1741 25.7727 19.7206 25.3181 20.1752C24.8635 20.6298 24.317 20.8571 23.6786 20.8571H2.32143C1.68304 20.8571 1.13653 20.6298 0.68192 20.1752C0.227307 19.7206 0 19.1741 0 18.5357V2.75C0 2.11161 0.227307 1.5651 0.68192 1.11049C1.13653 0.655877 1.68304 0.428571 2.32143 0.428571H23.6786C24.317 0.428571 24.8635 0.655877 25.3181 1.11049C25.7727 1.5651 26 2.11161 26 2.75Z" fill="white" />
              </svg>
            </button>
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