import React from "react";
import Link from "next/link";
import styles from './header.module.css'


type Props = {};

const header = (props: Props) => {
  return <header className="flex flex-wrap">
  <section className="relative w-screen mx-auto">
    {/* navbar */}
    <nav className="flex justify-between bg-black text-white ">
      <div className="px-0 xl: py-6 flex w-[1410px] mx-auto items-center">
       <Link href="/">
        <a className="text-3xl font-bold font-heading" >
          <img className="h-12" src="img/logo.png" alt="logo" />
        </a>
        </Link>
        {/* Nav Links */}
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li>
            <Link href="/">
            <a className="text-white hover:text-blue-300 text-base" >
              Trang Chủ
            </a>
            </Link>
          </li>
          <li>
            <Link href="/product">
            <a className="text-white hover:text-blue-300 text-base" >
              Sản Phẩm
            </a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
            <a className="text-white hover:text-blue-300 text-base" >
              Liên Hệ
            </a>
            </Link>
          </li>
          <li>
            <Link href="/blogs">
            <a className="text-white hover:text-blue-300 text-base" > 
              Tin Tức{" "}
            </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
            <a className="text-white hover:text-blue-300 text-base" >
              Giới Thiệu
            </a>
            </Link>
          </li>
        </ul>
        {/* Header Icons */}
        <div className="hidden xl:flex space-x-5 items-center">
          <a className="text-white hover:text-blue-300" >
            <img src="img/icon/search.png" />
          </a>
          <Link href="/admin">
          <a className="flex items-center hover:text-gray-200">
            <img src="img/icon/user.png" />
          </a>
          </Link>
          {/* Sign In / Register      */}
          <a className="flex items-center hover:text-gray-200" >
            <img src="img/icon/heart.png" />
          </a>
          <a className="flex items-center hover:text-gray-200" >
            <img src="img/icon/cart.png" />
          </a>
        </div>
      </div>
      {/* Responsive navbar */}
      <a className="xl:hidden flex mr-6 items-center" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="flex absolute -mt-5 ml-4">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      </a>
      <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 hover:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
    </nav>
  </section>
</header>


};

export default header;
