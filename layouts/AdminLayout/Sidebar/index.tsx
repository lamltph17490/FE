import {
  faSignOutAlt,
  faComment,
  faCircleUser,
  faNewspaper,
  faSlidersH,
  faHospitalAlt,
  faThList,
  faDroplet,
  faScaleUnbalancedFlip,
  faRuler
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/auth";
import { toast } from "react-toastify";

type Props = {};

const AdminMenu = (props: Props) => {
  const dispatch = useDispatch<any>();

  const handleSignout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
  };
  return (
    <nav className="dashboard__sidebar fixed top-0 left-0 z-20 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-gray-900 w-60 md:translate-x-0 -translate-x-full">
      <Link href="/">
        <span className="flex items-center p-4 text-white font-bold text-3xl cursor-pointer">
          WhiteCat
        </span>
      </Link>
      <nav
        className="text-sm font-medium text-gray-500"
        aria-label="Main Navigation"
      >
        <Link href="/admin">
          <span className="flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <svg
              className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentcolor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414.0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Dashboard</span>
          </span>
        </Link>

        <Link href="/admin/product">
          <span className="flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
              <FontAwesomeIcon icon={faHospitalAlt} />
            </div>
            <span>
              <b>Quản Lý Sản Phẩm</b>
            </span>
          </span>
        </Link>

        <Link href="/admin/users">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
              <span>
                <b>Quản Lý Người Dùng</b>
              </span>
            </div>
          </span>
        </Link>

        <Link href="/admin/blogs">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faNewspaper} />
              </div>
              <span>
                <b>Quản Lý Blog</b>
              </span>
            </div>
          </span>
        </Link>
        <Link href="/admin/blogCates">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faThList} />
              </div>
              <span>
                <b>Quản Lý Danh Mục Bài Viết</b>
              </span>
            </div>
          </span>
        </Link>
        <Link href="/admin/prdCates">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faThList} />
              </div>
              <span>
                <b>Quản Lý Danh Mục Sản Phẩm</b>
              </span>
            </div>
          </span>
        </Link>
        <Link href="/admin/prdSizes">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faRuler} />
              </div>
              <span>
                <b>Quản Lý Kích Cỡ</b>
              </span>
            </div>
          </span>
        </Link>
        <Link href="/admin/prdColors">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faDroplet} />
              </div>
              <span>
                <b>Quản Lý Màu Sắc</b>
              </span>
            </div>
          </span>
        </Link>
        <Link href="/admin/vouches">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faScaleUnbalancedFlip} />
              </div>
              <span>
                <b>Quản Lý Mã Giảm Giá</b>
              </span>
            </div>
          </span>
        </Link>
        <Link href="/admin/contact">
          <span className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            <div className="flex items-center">
              <div className="shrink-0 w-5 h-5 mr-2 text-gray-300 transition group-hover:text-gray-300">
                <FontAwesomeIcon icon={faComment} />
              </div>
              <span>
                <b>Quản lý Đơn Hàng</b>
              </span>
            </div>
          </span>
        </Link>
      </nav>
      <button
        className="py-2 w-full text-white font-bold text-md cursor-pointer fixed bottom-0 border-solid border-t-2 border-b-2 border-sky-500"
        onClick={handleSignout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
      </button>
    </nav>
  );
};

export default AdminMenu;
