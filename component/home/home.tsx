import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import PostHome from './postHome'
import PrdHome from './prdHome'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <>
    <Head>
      <title>
        Trang chủ
      </title>
    </Head>
      <div
        id="carouselExampleCaptions"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <picture>
            <img src="img/hero/hero-1.jpg" className="block w-full" alt="..." />
            </picture>
            <div className="carousel-caption hidden md:block absolute text-center">
              <h5 className="text-xl">First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>

          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <section className="pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] w-[1410px] mx-auto">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4">
              <div
                className="
         p-10
         pl-30
         md:px-7
         xl:px-10
         border
         border-gray-300
         bg-white
         text-center
         items-center
         justify-center
         mb-8
         "
              >
                <div
                  className="
            w-[70px]
            h-[70px]
            flex
            items-center
            justify-center
            bg-primary
            rounded-2xl
            m-auto
            mb-[15px]
            "
                >
                  <svg
                    width={50}
                    height={51}
                    viewBox="0 0 50 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_58_110)">
                      <path
                        d="M40.7876 20.4842H22.1615C23.0228 19.4942 23.5462 18.2027 23.5462 16.7905C23.5462 13.6828 21.0179 11.1545 17.9102 11.1545C14.8025 11.1545 12.2742 13.6828 12.2742 16.7905C12.2742 18.2027 12.7976 19.4942 13.6588 20.4842H9.21254C6.52573 20.4842 4.33984 22.6701 4.33984 25.3569V31.1066C4.33984 31.6448 4.77614 32.0811 5.31438 32.0811C5.85262 32.0811 6.28892 31.6448 6.28892 31.1066V25.3569C6.28892 23.7448 7.60046 22.4333 9.21254 22.4333H36.4996C38.1117 22.4333 39.4232 23.7448 39.4232 25.3569V30.6194H29.288C26.6012 30.6194 24.4153 32.8053 24.4153 35.4921C24.4153 38.1789 26.6012 40.3648 29.288 40.3648H39.4232V45.6273C39.4232 47.2394 38.1117 48.5509 36.4996 48.5509H9.21254C7.60046 48.5509 6.28892 47.2394 6.28892 45.6273V39.8699C6.28892 39.3317 5.85262 38.8954 5.31438 38.8954C4.77614 38.8954 4.33984 39.3317 4.33984 39.8699V45.6273C4.33984 48.3141 6.52573 50.5 9.21254 50.5H40.7876C43.4744 50.5 45.6603 48.3141 45.6603 45.6273V25.3569C45.6603 22.6701 43.4744 20.4842 40.7876 20.4842ZM17.9102 13.1037C19.9432 13.1037 21.5971 14.7576 21.5971 16.7906C21.5971 18.8236 19.9432 20.4775 17.9102 20.4775C15.8773 20.4775 14.2233 18.8236 14.2233 16.7906C14.2233 14.7576 15.8772 13.1037 17.9102 13.1037ZM40.3952 22.4333H40.7876C42.3997 22.4333 43.7112 23.7448 43.7112 25.3569V30.6194H41.3723V25.3569C41.3723 24.2608 41.0083 23.2483 40.3952 22.4333ZM26.3644 35.4921C26.3644 33.88 27.676 32.5685 29.288 32.5685H43.7112V38.4157H29.288C27.676 38.4157 26.3644 37.1042 26.3644 35.4921ZM40.7876 48.5509H40.3952C41.0083 47.7359 41.3723 46.7235 41.3723 45.6273V40.3648H43.7112V45.6273C43.7112 47.2394 42.3997 48.5509 40.7876 48.5509Z"
                        fill="black"
                      />
                      <path
                        d="M29.0386 34.5175C28.7813 34.5175 28.5299 34.6217 28.3486 34.803C28.1673 34.9843 28.064 35.2357 28.064 35.492C28.064 35.7483 28.1673 35.9997 28.3486 36.181C28.5308 36.3623 28.7813 36.4665 29.0386 36.4665C29.2949 36.4665 29.5453 36.3623 29.7276 36.181C29.9089 35.9997 30.0131 35.7483 30.0131 35.492C30.0131 35.2357 29.9089 34.9843 29.7276 34.803C29.5463 34.6216 29.2949 34.5175 29.0386 34.5175Z"
                        fill="black"
                      />
                      <path
                        d="M32.0899 13.9155C35.1976 13.9155 37.7259 11.3872 37.7259 8.27951C37.7259 5.1719 35.1976 2.64355 32.0899 2.64355C28.9822 2.64355 26.454 5.1718 26.454 8.27951C26.454 11.3872 28.9822 13.9155 32.0899 13.9155ZM32.0899 4.59273C34.1228 4.59273 35.7768 6.24662 35.7768 8.27961C35.7768 10.3126 34.1229 11.9665 32.0899 11.9665C30.0569 11.9665 28.4031 10.3126 28.4031 8.27961C28.4031 6.24662 30.0569 4.59273 32.0899 4.59273Z"
                        fill="black"
                      />
                      <path
                        d="M22.5716 10.1071C23.1098 10.1071 23.5461 9.6708 23.5461 9.13257V1.47454C23.5461 0.936301 23.1098 0.5 22.5716 0.5C22.0333 0.5 21.597 0.936301 21.597 1.47454V9.13257C21.597 9.6708 22.0333 10.1071 22.5716 10.1071Z"
                        fill="black"
                      />
                      <path
                        d="M17.8939 6.73705C18.4321 6.73705 18.8684 6.30075 18.8684 5.76251V1.47454C18.8684 0.936301 18.4321 0.5 17.8939 0.5C17.3556 0.5 16.9193 0.936301 16.9193 1.47454V5.76251C16.9193 6.30075 17.3556 6.73705 17.8939 6.73705Z"
                        fill="black"
                      />
                      <path
                        d="M5.31438 36.4665C5.57069 36.4665 5.82212 36.3623 6.00338 36.181C6.18465 35.9997 6.28892 35.7483 6.28892 35.492C6.28892 35.2357 6.18465 34.9843 6.00338 34.803C5.82212 34.6217 5.57166 34.5175 5.31438 34.5175C5.05808 34.5175 4.80665 34.6217 4.62538 34.803C4.44412 34.9843 4.33984 35.2357 4.33984 35.492C4.33984 35.7483 4.44412 35.9997 4.62538 36.181C4.80665 36.3623 5.05798 36.4665 5.31438 36.4665Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_58_110">
                        <rect
                          width={50}
                          height={50}
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h4 className="font-semibold text-xl text-dark mb-3">
                  Thanh Toán Tiện Lợi
                </h4>
                <p className="text-body-color">We dejoy working with discerning</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4">
              <div
                className="
         p-10
         pl-30
         md:px-7
         xl:px-10
         border
         border-gray-300
         bg-white
         text-center
         items-center
         justify-center
         mb-8
         "
              >
                <div
                  className="
            w-[70px]
            h-[70px]
            flex
            items-center
            justify-center
            bg-primary
            rounded-2xl
            m-auto
            mb-[15px]
            "
                >
                  <svg
                    width={50}
                    height={51}
                    viewBox="0 0 50 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_58_146)">
                      <path
                        d="M45.1843 15.9863L45.1702 40.2496C45.169 42.5963 42.7682 44.1776 40.6069 43.2554C39.5309 42.7953 40.1808 41.2597 41.2642 41.7236C42.3212 42.1747 43.5028 41.4082 43.5034 40.2485L43.5175 15.9858C43.5175 8.3662 37.3181 2.16679 29.6979 2.16679H22.3345C14.7143 2.16679 8.51493 8.3662 8.51493 15.9863L8.51972 24.7723C8.51993 25.2325 8.14709 25.6059 7.68675 25.6061C7.22651 25.6063 6.85314 25.2336 6.85294 24.7731L6.84814 15.9868C6.84814 7.44718 13.7952 0.5 22.3345 0.5H29.6979C38.2371 0.5 45.1843 7.44718 45.1843 15.9863ZM40.6788 20.8096C40.6788 20.4371 40.4316 20.1098 40.0733 20.008C37.0836 19.1582 34.5573 16.9632 33.3562 13.9369C33.094 13.2758 32.1722 13.2265 31.8426 13.8592C30.5147 16.4077 28.4515 18.545 25.7821 19.9658C25.794 18.825 25.5136 17.6727 24.9267 16.6294C24.6337 16.1087 23.9062 16.0597 23.5429 16.5259C22.4307 17.9531 20.4766 19.889 17.4831 21.0067C17.0518 21.1678 16.8328 21.6478 16.9938 22.079C17.1549 22.5104 17.6351 22.729 18.066 22.5683C20.7211 21.577 22.6448 20.0153 23.9491 18.6157C24.1639 19.4283 24.1768 20.3005 23.9527 21.1578C23.7791 21.8228 24.4424 22.4015 25.0781 22.1385C28.1912 20.8486 30.7326 18.7327 32.5087 16.0167C33.9991 18.6507 36.3493 20.5065 39.0122 21.4214V32.2646C39.0122 37.3175 36.0465 41.9515 31.457 44.0704C31.0392 44.2634 30.8568 44.7585 31.0497 45.1764C31.2427 45.5941 31.7376 45.7767 32.1557 45.5837C37.2996 43.2089 40.6352 38.0337 40.6785 32.3766C40.6791 32.358 40.6788 20.8282 40.6788 20.8096ZM24.6023 41.1907C23.0881 39.6767 20.6377 39.6766 19.1234 41.1907C18.6345 41.68 17.8384 41.6798 17.3495 41.1907L14.1194 37.9608C13.6303 37.4717 13.6304 36.6757 14.1195 36.1867C14.5442 35.7619 14.8569 35.2598 15.0486 34.6943C15.1965 34.2583 14.963 33.7851 14.527 33.6373C14.0913 33.4894 13.6179 33.723 13.4701 34.1589C13.3612 34.4801 13.1831 34.7656 12.9407 35.008C11.8018 36.1471 11.8018 38.0002 12.9407 39.1393L16.1708 42.3693C17.3099 43.5084 19.1632 43.5082 20.302 42.3693C21.1645 41.5066 22.561 41.5066 23.4235 42.3693L24.9494 43.8951C25.8119 44.7576 25.8121 46.1539 24.9494 47.0165C22.5262 49.4399 18.5834 49.4397 16.1604 47.0165L8.29335 39.1495C5.87016 36.7264 5.87016 32.7836 8.29335 30.3605C9.15394 29.4997 10.5541 29.4997 11.4147 30.3603L11.5813 30.527C12.1236 31.0695 13.0159 30.647 13.014 29.9258L12.9944 22.6869C12.9932 22.2274 12.6203 21.8557 12.161 21.8557C11.7 21.8557 11.3264 22.23 11.3276 22.6913L11.343 28.3426C6.38155 26.2789 1.96935 35.1828 7.11473 40.3282L14.9818 48.1953C18.055 51.2683 23.0548 51.2683 26.1281 48.1953C27.6421 46.6811 27.6422 44.2306 26.128 42.7164L24.6023 41.1907ZM22.6826 29.3563V27.1686C22.6826 26.7084 22.3095 26.3352 21.8492 26.3352C21.389 26.3352 21.0158 26.7084 21.0158 27.1686V29.3563C21.0158 29.8165 21.389 30.1897 21.8492 30.1897C22.3095 30.1897 22.6826 29.8165 22.6826 29.3563ZM31.0166 27.1686C31.0166 26.7084 30.6434 26.3352 30.1832 26.3352C29.7229 26.3352 29.3498 26.7084 29.3498 27.1686V29.3563C29.3498 29.8165 29.7229 30.1897 30.1832 30.1897C30.6434 30.1897 31.0166 29.8165 31.0166 29.3563V27.1686ZM27.808 35.6692C26.6428 36.5433 25.0087 36.5702 23.8078 35.6693C23.4397 35.3931 22.9172 35.4677 22.6411 35.8359C22.3649 36.2042 22.4394 36.7265 22.8076 37.0027C24.6075 38.3531 27.0587 38.3149 28.8082 37.0028C29.1764 36.7266 29.251 36.2042 28.975 35.836C28.6984 35.4676 28.1758 35.3931 27.808 35.6692Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_58_146">
                        <rect
                          width={50}
                          height={50}
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h4 className="font-semibold text-xl text-dark mb-3">
                  Tư Vấn Nhiệt Tình
                </h4>
                <p className="text-body-color">We dejoy working with discerning</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4">
              <div
                className="
         p-10
         pl-30
         md:px-7
         xl:px-10
         border
         border-gray-300
         bg-white
         text-center
         items-center
         justify-center
         mb-8
         "
              >
                <div
                  className="
            w-[70px]
            h-[70px]
            flex
            items-center
            justify-center
            bg-primary
            rounded-2xl
            m-auto
            mb-[15px]
            "
                >
                  <svg
                    width={50}
                    height={51}
                    viewBox="0 0 50 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.5124 30.1094C42.21 29.5822 41.7571 29.1572 41.2116 28.8891C40.7492 28.6548 40.2357 28.5393 39.7174 28.553C39.1992 28.5666 38.6924 28.709 38.2429 28.9672L30.4023 33.4899C30.2751 32.8175 29.9297 32.206 29.4195 31.75C28.842 31.2467 28.1019 30.9692 27.3359 30.9688H22.5226C22.4199 30.9689 22.3181 30.9487 22.2232 30.9094C22.1283 30.8701 22.0421 30.8125 21.9695 30.7399L21.7788 30.5492C21.4173 30.1858 20.9872 29.8977 20.5136 29.7015C20.04 29.5053 19.5321 29.405 19.0195 29.4063H13.0156C12.8976 29.4063 12.7812 29.4141 12.6249 29.4258C11.7276 29.515 10.8887 29.9119 10.2507 30.5492L8.20306 32.5985L7.47415 31.8696C7.32764 31.7231 7.12897 31.6408 6.92181 31.6408C6.71465 31.6408 6.51597 31.7231 6.36946 31.8696L1.94837 36.2813C1.87573 36.3538 1.81811 36.44 1.77879 36.5348C1.73947 36.6297 1.71924 36.7313 1.71924 36.834C1.71924 36.9367 1.73947 37.0383 1.77879 37.1332C1.81811 37.228 1.87573 37.3142 1.94837 37.3867L12.9945 48.4414C13.067 48.5141 13.1532 48.5717 13.248 48.611C13.3429 48.6503 13.4445 48.6706 13.5472 48.6706C13.6499 48.6706 13.7515 48.6503 13.8464 48.611C13.9412 48.5717 14.0274 48.5141 14.0999 48.4414L18.5218 44.0196C18.6683 43.8731 18.7505 43.6744 18.7505 43.4672C18.7505 43.2601 18.6683 43.0614 18.5218 42.9149L17.9023 42.2953L18.064 42.1336C18.2107 41.9877 18.4094 41.9059 18.6163 41.9063H27.2882C27.9745 41.9078 28.6488 41.726 29.2413 41.3797L41.3663 34.3797C41.8438 34.1078 42.2402 33.7136 42.5148 33.2377C42.7894 32.7618 42.9323 32.2213 42.9288 31.6719C42.9289 31.1236 42.7853 30.5849 42.5124 30.1094ZM13.5468 46.786L3.6054 36.8368L6.92103 33.5258L16.864 43.4688L13.5468 46.786ZM40.5859 33.0266L28.4546 40.0313C28.1009 40.2374 27.6984 40.3453 27.289 40.3438H18.6171C18.3091 40.3428 18.0039 40.403 17.7193 40.5209C17.4348 40.6388 17.1764 40.812 16.9593 41.0305L16.7976 41.1922L9.30774 33.7032L11.357 31.6539C11.7363 31.2744 12.2349 31.0371 12.7687 30.9821C12.8546 30.975 12.9351 30.9688 13.0156 30.9688H19.0195C19.3269 30.9681 19.6313 31.0282 19.9153 31.1458C20.1994 31.2634 20.4573 31.4361 20.6741 31.6539L20.8648 31.8446C21.0819 32.0631 21.3402 32.2363 21.6248 32.3542C21.9094 32.4721 22.2146 32.5323 22.5226 32.5313H27.3359C27.7215 32.5307 28.0944 32.6694 28.3859 32.9219C28.6795 33.1792 28.8639 33.5388 28.9015 33.9274C28.9269 34.1719 28.8912 34.4188 28.7976 34.6461C28.7259 34.8556 28.606 35.0454 28.4476 35.2C28.3029 35.3453 28.1309 35.4605 27.9414 35.5388C27.7519 35.6171 27.5487 35.6571 27.3437 35.6563H22.2031C21.9959 35.6563 21.7971 35.7386 21.6506 35.8851C21.5041 36.0316 21.4218 36.2303 21.4218 36.4375C21.4218 36.6447 21.5041 36.8434 21.6506 36.99C21.7971 37.1365 21.9959 37.2188 22.2031 37.2188H27.3437C27.7541 37.2196 28.1607 37.1391 28.5398 36.9818C28.9189 36.8245 29.263 36.5936 29.5523 36.3024C29.8059 36.0513 30.0125 35.7568 30.1624 35.4328L39.0202 30.3188C39.2473 30.1899 39.5029 30.1196 39.7639 30.1141C40.025 30.1087 40.2833 30.1683 40.5156 30.2875C40.785 30.4196 41.0089 30.629 41.1585 30.8891C41.2949 31.1269 41.3668 31.3962 41.3671 31.6703C41.369 31.9454 41.2977 32.216 41.1604 32.4544C41.0231 32.6927 40.8248 32.8902 40.5859 33.0266Z"
                      fill="black"
                    />
                    <path
                      d="M11.7187 27.0625H39.8437C40.0509 27.0625 40.2496 26.9802 40.3961 26.8337C40.5426 26.6872 40.6249 26.4885 40.6249 26.2812V2.84375C40.6249 2.63655 40.5426 2.43784 40.3961 2.29132C40.2496 2.14481 40.0509 2.0625 39.8437 2.0625H11.7187C11.5115 2.0625 11.3128 2.14481 11.1663 2.29132C11.0197 2.43784 10.9374 2.63655 10.9374 2.84375V26.2812C10.9374 26.4885 11.0197 26.6872 11.1663 26.8337C11.3128 26.9802 11.5115 27.0625 11.7187 27.0625ZM27.3437 3.625V9.875H24.2187V3.625H27.3437ZM12.4999 3.625H22.6562V10.6562C22.6562 10.8635 22.7385 11.0622 22.885 11.2087C23.0315 11.3552 23.2302 11.4375 23.4374 11.4375H28.1249C28.3321 11.4375 28.5309 11.3552 28.6774 11.2087C28.8239 11.0622 28.9062 10.8635 28.9062 10.6562V3.625H39.0624V25.5H12.4999V3.625Z"
                      fill="black"
                    />
                    <path
                      d="M19.5312 22.375H14.8437C14.6365 22.375 14.4378 22.4573 14.2913 22.6038C14.1447 22.7503 14.0624 22.949 14.0624 23.1562C14.0624 23.3635 14.1447 23.5622 14.2913 23.7087C14.4378 23.8552 14.6365 23.9375 14.8437 23.9375H19.5312C19.7384 23.9375 19.9371 23.8552 20.0836 23.7087C20.2301 23.5622 20.3124 23.3635 20.3124 23.1562C20.3124 22.949 20.2301 22.7503 20.0836 22.6038C19.9371 22.4573 19.7384 22.375 19.5312 22.375Z"
                      fill="black"
                    />
                    <path
                      d="M19.5312 20.0312H14.8437C14.6365 20.0312 14.4378 20.1136 14.2913 20.2601C14.1447 20.4066 14.0624 20.6053 14.0624 20.8125C14.0624 21.0197 14.1447 21.2184 14.2913 21.3649C14.4378 21.5114 14.6365 21.5938 14.8437 21.5938H19.5312C19.7384 21.5938 19.9371 21.5114 20.0836 21.3649C20.2301 21.2184 20.3124 21.0197 20.3124 20.8125C20.3124 20.6053 20.2301 20.4066 20.0836 20.2601C19.9371 20.1136 19.7384 20.0312 19.5312 20.0312Z"
                      fill="black"
                    />
                    <path
                      d="M22.6562 20.0312H21.8749C21.6677 20.0312 21.469 20.1136 21.3225 20.2601C21.176 20.4066 21.0937 20.6053 21.0937 20.8125C21.0937 21.0197 21.176 21.2184 21.3225 21.3649C21.469 21.5114 21.6677 21.5938 21.8749 21.5938H22.6562C22.8634 21.5938 23.0621 21.5114 23.2086 21.3649C23.3551 21.2184 23.4374 21.0197 23.4374 20.8125C23.4374 20.6053 23.3551 20.4066 23.2086 20.2601C23.0621 20.1136 22.8634 20.0312 22.6562 20.0312Z"
                      fill="black"
                    />
                    <path
                      d="M19.5312 17.6875H14.8437C14.6365 17.6875 14.4378 17.7698 14.2913 17.9163C14.1447 18.0628 14.0624 18.2615 14.0624 18.4688C14.0624 18.676 14.1447 18.8747 14.2913 19.0212C14.4378 19.1677 14.6365 19.25 14.8437 19.25H19.5312C19.7384 19.25 19.9371 19.1677 20.0836 19.0212C20.2301 18.8747 20.3124 18.676 20.3124 18.4688C20.3124 18.2615 20.2301 18.0628 20.0836 17.9163C19.9371 17.7698 19.7384 17.6875 19.5312 17.6875Z"
                      fill="black"
                    />
                    <path
                      d="M22.6562 17.6875H21.8749C21.6677 17.6875 21.469 17.7698 21.3225 17.9163C21.176 18.0628 21.0937 18.2615 21.0937 18.4688C21.0937 18.676 21.176 18.8747 21.3225 19.0212C21.469 19.1677 21.6677 19.25 21.8749 19.25H22.6562C22.8634 19.25 23.0621 19.1677 23.2086 19.0212C23.3551 18.8747 23.4374 18.676 23.4374 18.4688C23.4374 18.2615 23.3551 18.0628 23.2086 17.9163C23.0621 17.7698 22.8634 17.6875 22.6562 17.6875Z"
                      fill="black"
                    />
                    <path
                      d="M22.6562 22.375H21.8749C21.6677 22.375 21.469 22.4573 21.3225 22.6038C21.176 22.7503 21.0937 22.949 21.0937 23.1562C21.0937 23.3635 21.176 23.5622 21.3225 23.7087C21.469 23.8552 21.6677 23.9375 21.8749 23.9375H22.6562C22.8634 23.9375 23.0621 23.8552 23.2086 23.7087C23.3551 23.5622 23.4374 23.3635 23.4374 23.1562C23.4374 22.949 23.3551 22.7503 23.2086 22.6038C23.0621 22.4573 22.8634 22.375 22.6562 22.375Z"
                      fill="black"
                    />
                    <path
                      d="M36.7187 19.25H28.9062C28.699 19.25 28.5003 19.3323 28.3538 19.4788C28.2072 19.6253 28.1249 19.824 28.1249 20.0312V23.1562C28.1249 23.3635 28.2072 23.5622 28.3538 23.7087C28.5003 23.8552 28.699 23.9375 28.9062 23.9375H36.7187C36.9259 23.9375 37.1246 23.8552 37.2711 23.7087C37.4176 23.5622 37.4999 23.3635 37.4999 23.1562V20.0312C37.4999 19.824 37.4176 19.6253 37.2711 19.4788C37.1246 19.3323 36.9259 19.25 36.7187 19.25ZM35.9374 22.375H29.6874V20.8125H35.9374V22.375Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-xl text-dark mb-3">
                  Giao Hàng Nhanh
                </h4>
                <p className="text-body-color">We dejoy working with discerning</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-4">
              <div
                className="
         p-10
         pl-30
         md:px-7
         xl:px-10
         border
         border-gray-300
         bg-white
         text-center
         items-center
         justify-center
         mb-8
         "
              >
                <div
                  className="
            w-[70px]
            h-[70px]
            flex
            items-center
            justify-center
            bg-primary
            rounded-2xl
            m-auto
            mb-[15px]
            "
                >
                  <svg
                    width={50}
                    height={51}
                    viewBox="0 0 50 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_58_138)">
                      <path
                        d="M37.5814 18.1464C37.5132 18.1464 3.52546 18.1464 3.52546 18.1464L10.6862 10.1203C11.1505 9.59984 11.105 8.8015 10.5845 8.33715C10.0642 7.87289 9.26568 7.9182 8.80133 8.43881L0.736693 17.4779C-0.245629 18.5792 -0.245532 20.2398 0.736791 21.3408L8.80142 30.38C9.05103 30.6598 9.39683 30.8022 9.7442 30.8022C10.0434 30.8022 10.3437 30.6964 10.5846 30.4816C11.1051 30.0173 11.1505 29.219 10.6863 28.6984L3.52556 20.6723C3.52556 20.6723 37.5132 20.6723 37.5815 20.6723C43.0363 20.6723 47.474 25.1102 47.474 30.5648C47.474 36.0195 43.0362 40.4574 37.5815 40.4574H31.5678C30.8702 40.4574 30.3048 41.0229 30.3048 41.7204C30.3048 42.4179 30.8702 42.9834 31.5678 42.9834H37.5815C44.4291 42.9834 50 37.4125 50 30.5648C49.9999 23.7173 44.429 18.1464 37.5814 18.1464Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_58_138">
                        <rect
                          width={50}
                          height={50}
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h4 className="font-semibold text-xl text-dark mb-3">
                  Đổi Trả Trong 14 Ngày
                </h4>
                <p className="text-body-color">We dejoy working with discerning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* service */}
      <section
        className="categories container-full py-5 bg-rose-50"
        data-aos="zoom-in-up"
      >
        <div className="w-[1410px] mx-auto  flex-wrap  flex justify-center">
          {/* {cateProduct.map((item:any)=>(
            <div className="cate_item lg:w-1/5 md:w-2/5 pr-4 pl-4">
            <a href="#">
             <picture>
              <img
                  src={item.image}
                  className="rounded-full max-w-full h-auto border" alt=''
                />
             </picture>
            </a>
            <h5 className="text-center title mt-3 mb-3 text-sm capitalize text-black">
              <a href="#">{item.name}</a>
            </h5>
          </div>
          ))} */}
        </div>
      </section>

      {/* Product Section Begin */}
      
      <PrdHome products={[]} />

      

      {/* Product Section End */}
      <section className="mb-32 text-gray-800 text-center lg:text-left">
        <div className="block bg-[#F6EEEA]">
          <div className="flex flex-wrap items-center">
            <div className="grow-0 shrink-0 basis-auto hidden lg:flex lg:w-6/12 xl:w-1/2">
              <picture>
              <img
                src="img/about/testimonial-pic.jpg"
                alt="Trendy Pants and Shoes"
                className="w-full "
              />
              </picture>
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-1/2">
              <div className="px-6 py-12  mx-auto ml-[64px]">
                <h2 className="text-3xl font-normal mb-6">
                  Đăng ký để nhận 30% ưu đãi
                </h2>
                <div className="md:flex flex-row">
                  <input
                    type="text"
                    className="w-[440px] form-control block  px-4 py-2 mb-2 md:mb-0 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email của bạn"
                  />
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-black text-white font-normal text-sm leading-snug uppercase hover:bg-black hover:text-black "
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[1410px] mx-auto">
        <div className="container px-6 text-gray-600 md:px-12 xl:px-6">
          <h2 className="mb-12 text-center text-2xl text-gray-900 font-light md:text-4xl">
            Đánh Giá Từ Khách Hàng
          </h2>
          <div className="grid gap-[63px] lg:grid-cols-2">
            <div className="p-6 border border-gray-100 bg-light sm:flex flex-col sm:space-x-8 sm:p-8 ">
              <div className="flex items-center justify-center mb-[15px]">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-center">
                <p className="text-gray-600">
                  {" "}
                  <span className="font-serif">&quot;</span> Mình là người khá kỹ tính
                  trong việc mua hàng, mà shop này lại làm mình vui vẻ khi mua hàng
                  thì là một thành công lớn của shop này rồi đấy{" "}
                  <span className="font-serif">&ldquo;</span>
                </p>
                <div className="pb-[34px] text-center">
                 <picture>
                 <img
                    className="w-20 h-20 mx-auto rounded-full mb-[20px]"
                    src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/first_user.webp"
                    alt="user avatar"
                    height={220}
                    width={220}
                    loading="lazy"
                  />
                 </picture>
                  <h6 className="text-lg font-semibold leading-none">Đỗ Văn A</h6>
                </div>
              </div>
            </div>
            <div className="p-6 border border-gray-100 bg-light sm:flex flex-col sm:space-x-8 sm:p-8 justify-center">
              <div className="flex items-center justify-center mb-[15px]">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="space-y-4 mt-4 text-center sm:mt-0 sm:text-center">
                <p className="text-gray-600">
                  {" "}
                  <span className="font-serif">&quot;</span> Không phải tự dưng mà tôi khen
                  shop này đâu nhé. Đồ gì đâu mà vừa chất lượng lại vừa có giá vô cùng
                  rẻ nữa chứ. <span className="font-serif">&ldquo;</span>
                </p>
                <div className="pb-[34px] text-center">
                 <picture>
                 <img
                    className="w-20 h-20 mx-auto rounded-full mb-[20px]"
                    src="https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/third_user.webp"
                    alt="user avatar"
                    height={220}
                    width={220}
                    loading="lazy"
                  />
                 </picture>
                  <h6 className="text-lg font-semibold leading-none">Nguyễn Văn A</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Section Begin */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl  font-light text-gray-800 capitalize lg:text-4xl dark:text-white">
              Tin Tức Thời Trang
            </h1>
          </div>
          
           <PostHome posts={[]}/>

          
        </div>
      </section>


    </>
  )
}

export default HomePage