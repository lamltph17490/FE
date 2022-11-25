import React from "react";
import { useSelector } from "react-redux";
import { Tuser } from "../../../models/user";
import { RootState } from "../../../redux/store";
import Link from "next/link";
import styles from './header.module.css'


type Props = {};

const header = (props: Props) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const curentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;

  return <header className="flex flex-wrap">
    <section className="relative mx-auto">
      {/* navbar */}
      <nav className="flex justify-between bg-black text-white w-screen">
        <div className="px-0 xl: py-6 flex w-[1410px] mx-auto items-center">
          <a className="text-3xl font-bold font-heading" href="#">
            <img className="h-12" src="img/logo.png" alt="logo" />
          </a>
          {/* Nav Links */}
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            <li>
              <Link className="hover:text-gray-200" href="/">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" href="/product">
                Sản Phẩm
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" href="/contact">
                Liên Hệ
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" href="/blogs">
                Tin Tức
              </Link>
            </li>
            <li>
              <a className="hover:text-gray-200" href="#">
                Giới Thiệu
              </a>
            </li>
          </ul>
          {/* Header Icons */}
          <div className="hidden xl:flex items-center space-x-5 items-center">
            <a className="hover:text-gray-200" href="#">
              <img src="img/icon/search.png" />
            </a>
            
            <a className="flex items-center hover:text-gray-200" href="#">
            {isLogged ? (
              <li className="relative flex items-center ml-3 cursor-pointer before:absolute before:content-[''] before:top-full before:left-0 before:h-2 before:right-0">
                 <Link href="/user"><img src="img/icon/user.png" /></Link>
                <span className="ml-1 hover:text-[#282828]">
                  <Link href={curentUser.role ? "/admin" : "/user"}>{curentUser.name}</Link>
                </span>
              </li>
            ) : (
              <li className="relative group flex items-center ml-3 cursor-pointer before:absolute before:content-[''] before:top-full before:left-0 before:h-2 before:right-0">             
                <Link href="/user"><img src="img/icon/user.png" /></Link>
                <span className="ml-1 group-hover:text-[#282828]">Tài khoản</span>

                <ul className="bg-white hidden group-hover:block absolute top-[calc(100%+8px)] left-0 shadow px-2 py-1 z-[50] divide-y min-w-[150px]">
                  <li className="text-[#282828] text-sm py-1.5 font-semibold hover:text-[#4d8a54]">
                    <Link href="/login">Đăng nhập</Link>
                  </li>
                  <li className="text-[#282828] text-sm py-1.5 font-semibold hover:text-[#4d8a54]">
                    <Link href="/register">Đăng ký</Link>
                  </li>
                </ul>
              </li>
            )}
              
            </a>
            {/* Sign In / Register      */}
            <a className="flex items-center hover:text-gray-200" href="#">
              <img src="img/icon/heart.png" />
            </a>
            <a className="flex items-center hover:text-gray-200" href="#">
              <img src="img/icon/cart.png" />
            </a>
          </div>
        </div>
        {/* Responsive navbar */}
        <a className="xl:hidden flex mr-6 items-center" href="#">
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
