import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
type Props = {};

const Contact = (props: Props) => {
  const form = useRef<any>();
  const route = useRouter();
  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs.sendForm("service_7magxxi", "template_qpun9jd", form.current, "GB0nRglh2RmNxpQsu").then(
      (result) => {
        console.log(result.text);
        alert('Gửi thành công !')
        route.push('/contact')
      },
      (error) => {
        console.log(error.text);
      },
    );
  };
  return (
    <div>
      <div className="main w-[1240px] mx-auto mt-[112px] grid grid-cols-2">
        <div className="mr-[81px]">
          <h2 className="text-2xl mb-[30px]">LIÊN HỆ</h2>
          <span className="text-[#6E6F7E] ">
            Nếu bạn muốn biết thêm về các chính sách của chúng tôi, bạn có thể tham khảo các điều khoản và điều kiện của
            chúng tôi. Bạn cũng sẽ có thể làm theo đơn đặt hàng của mình (số theo dõi sẽ được cung cấp trong e-mail sau
            khi đặt hàng). Bạn muốn trả lại một số mặt hàng?
            <a href="./cart/cancelorder" className="text-[#E22C43]">
              Bấm vào đây.
            </a>
          </span>
          <div className="mt-[40px]">
            <div className="flex">
              <svg className="mr-[26px] mt-[10px]" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C9.18445 0 4.45312 4.73133 4.45312 10.5469C4.45312 12.5118 4.9974 14.4293 6.02748 16.0929L14.3996 29.5845C14.56 29.843 14.8426 30 15.1464 30C15.1488 30 15.1511 30 15.1534 30C15.4599 29.9976 15.743 29.8357 15.9005 29.5727L24.0592 15.9504C25.0325 14.322 25.5469 12.4535 25.5469 10.5469C25.5469 4.73133 20.8155 0 15 0ZM22.5507 15.0479L15.1331 27.4328L7.5215 15.1668C6.6641 13.7821 6.19922 12.1846 6.19922 10.5469C6.19922 5.70059 10.1537 1.74609 15 1.74609C19.8463 1.74609 23.7949 5.70059 23.7949 10.5469C23.7949 12.136 23.3607 13.6927 22.5507 15.0479Z" fill="black" />
                <path d="M15 5.27344C12.0922 5.27344 9.72656 7.6391 9.72656 10.5469C9.72656 13.4361 12.0537 15.8203 15 15.8203C17.9826 15.8203 20.2734 13.4043 20.2734 10.5469C20.2734 7.6391 17.9078 5.27344 15 5.27344ZM15 14.0742C13.0513 14.0742 11.4727 12.4903 11.4727 10.5469C11.4727 8.60836 13.0615 7.01953 15 7.01953C16.9385 7.01953 18.5215 8.60836 18.5215 10.5469C18.5215 12.4619 16.9795 14.0742 15 14.0742Z" fill="black" />
              </svg>
              <div>
                <h3 className="text-xl">Địa chỉ</h3>
                <span className="text-[#6E6F7E]">Số 1 Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội</span>
              </div>
            </div>
            <div className="flex py-[20px]">
              <svg className="mr-[26px] mt-[10px]" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.0033 14.194L16.7578 9.94846V2.63672C16.7578 1.18283 15.575 0 14.1211 0H2.63672C1.18283 0 0 1.18283 0 2.63672V27.3633C0 28.8172 1.18283 30 2.63672 30H20.5664C20.9851 30 21.3456 29.7047 21.4281 29.2942L23.066 21.141C23.5776 18.5942 22.8065 15.9972 21.0033 14.194ZM2.63672 1.75781H14.1211C14.6057 1.75781 15 2.15209 15 2.63672V13.9734C13.922 12.9101 12.1901 12.916 11.1195 13.9866C10.0465 15.0578 10.0414 16.7967 11.1123 17.8748L14.4789 21.3748C13.749 21.9195 12.8036 22.8702 12.1246 24.4336H1.75781V2.63672C1.75781 2.15209 2.15203 1.75781 2.63672 1.75781ZM1.75781 27.3633V26.1914H11.5564C11.4171 26.8077 11.3185 27.4891 11.2751 28.2422H2.63672C2.15203 28.2422 1.75781 27.8479 1.75781 27.3633ZM21.3426 20.7948L19.8465 28.2422C18.4332 28.2422 14.4881 28.2422 13.037 28.2422C13.1637 26.3753 13.7011 24.8108 14.61 23.6815C15.3635 22.7453 16.1307 22.4096 16.1919 22.3839C16.767 22.1781 16.9725 21.4316 16.5124 20.9532C12.3567 16.6328 12.3694 16.6459 12.3619 16.6385C11.9759 16.2525 11.9698 15.6216 12.3619 15.2301C12.7494 14.8427 13.3792 14.8416 13.768 15.2272C15.6261 17.1278 14.7226 16.2158 17.9742 19.4673C18.3173 19.8105 18.8739 19.8106 19.2171 19.4673C19.5604 19.1241 19.5604 18.5676 19.2171 18.2244L16.7578 15.7651V12.4344L19.7603 15.4369C21.1465 16.8231 21.7381 18.8261 21.3426 20.7948Z" fill="black" />
              </svg>
              <div>
                <h3 className="text-xl">Số điện thoại</h3>
                <span className="text-[#6E6F7E]">0987654321</span>
              </div>
            </div>
            <div className="flex">
              <svg className="mr-[26px] mt-[10px]" width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.9285 0H1.07145C0.479694 0 0 0.479694 0 1.07139V20.3571C0 20.9488 0.479694 21.4285 1.07145 21.4285H28.9285C29.5203 21.4285 30 20.9488 30 20.3571V1.07139C30 0.479694 29.5203 0 28.9285 0ZM27.1714 2.14283L15 11.505L2.82857 2.14283H27.1714ZM27.8571 19.2857H2.14283V4.31888L14.3475 13.7067C14.7323 14.0022 15.2677 14.0022 15.6525 13.7067L27.8571 4.31888V19.2857Z" fill="black" />
              </svg>
              <div>
                <h3 className="text-xl">Email</h3>
                <span className="text-[#6E6F7E]">example@gmail.com</span>
              </div>
            </div>
            <div className="flex py-[20px]">
              <svg className="mr-[26px] mt-[10px]" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g >
                  <path d="M15 0C6.7292 0 0 6.72885 0 15C0 23.2712 6.7292 30 15 30C23.2712 30 30 23.2712 30 15C30 6.72885 23.2708 0 15 0ZM15 27.8102C7.93652 27.8102 2.18977 22.0635 2.18977 15C2.18977 7.93652 7.93652 2.18977 15 2.18977C22.0635 2.18977 27.8102 7.93647 27.8102 14.9996C27.8102 22.0635 22.0635 27.8102 15 27.8102Z" fill="black" />
                  <path d="M20.1091 15.0001H15.3646V8.4307C15.3646 7.82595 14.8744 7.33582 14.2697 7.33582C13.6649 7.33582 13.1748 7.82595 13.1748 8.4307V16.0949C13.1748 16.6997 13.6649 17.1898 14.2697 17.1898H20.1091C20.7138 17.1898 21.204 16.6997 21.204 16.0949C21.204 15.4902 20.7138 15.0001 20.1091 15.0001Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_135_3816">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>
                <h3 className="text-xl">Giờ mở cửa</h3>
                <span className="text-[#6E6F7E]">Từ 7h - 21h hàng ngày </span>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="text-2xl">GÓP Ý VỚI CHÚNG TÔI</h2>
          <form action="" ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="Tên của bạn"
              name="from_name"
              className="w-[590px] h-[60px] border border-[#A4A5AE] pl-[24px] mt-[30px]"
            />
            <input
              type="email"
              placeholder="Email của bạn"
              name="from_email"
              className="w-[590px] h-[60px] border border-[#A4A5AE] pl-[24px] mt-[30px]"
            />
            <textarea name="message" id="" className="w-[590px] h-[120px] border border-[#A4A5AE] mt-[30px]"></textarea>
            <input type="submit" value="Send" className="bg-black w-[590px] h-[60px] mt-[28px] text-slate-50" />
            {/* <div>
                            <button className="bg-black w-[590px] h-[60px] mt-[28px] ">
                                <a href="" className="text-slate-50 ">Gửi</a>
                            </button>
                        </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
