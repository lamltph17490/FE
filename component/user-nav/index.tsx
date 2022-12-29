import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tuser } from "../../models/user";
import { logout } from "../../redux/auth";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
type Props = {};

const UserNav = (props: Props) => {
  const router = useRouter();
  const dispacth = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;
  const handleLogout = () => {
    dispacth(logout());
    toast.success("Đăng xuất thành công");
    router.push("/login");
  };

  return (
    <div className="w-[200px]">
      <h2 className="text-xl">Trang tài khoản</h2>
      <div className="mt-[14px]">
        
          <ul className="flex">
            <li className="mr-[40px]">
              <a href="" className="text-lg">
              Xin chào:{" "}
              </a>
            </li>
            <li>
              <a href="" className="text-red-500 text-lg">
              {currentUser.name}
              </a>
            </li>

          </ul>
      </div>

      <ul className=" text-lg">
        <li>
          <Link href="/user" className="mb-8">
            <span>Thông tin tài khoản</span>
          </Link>
        </li>
        <li>
          <Link href="/user/order" className="mb-[12px]">
            <span>Đơn hàng của bạn</span>
          </Link>
        </li>
        <li>
          <Link href="/user/changePassword" className="mb-[12px]">
            <span>Đổi lại mật khẩu</span>
          </Link>
        </li>
        <li className="mb-[12px] cursor-pointer" onClick={handleLogout}>
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
