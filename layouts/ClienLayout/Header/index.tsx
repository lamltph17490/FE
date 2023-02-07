import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tuser } from "../../../models/user";
import { RootState } from "../../../redux/store";
import Link from "next/link";
import styles from "./header.module.css";
import { faSearch, faUser, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, message, notification } from "antd";
import { socket } from "../../../untils/SocketConstant";
import moment from "moment";
import { getNotificationApi, readedNotification } from "../../../Api/notification";
import { to } from "react-spring";
import { useRouter } from "next/router";
import { getOrders } from "../../../Api/orders";
import { getAll } from "../../../Api/prdApi";
import { filterProductS, getProducts } from "../../../redux/prdSlice";
import { searchProduct } from "../../../Api/products";

type Props = {};

const header = (props: Props) => {
  const products = useSelector((state: RootState) => state.prd.products);
  const dispatch = useDispatch<any>();
  const [product, setProduct] = useState([]);

  const curentUse = useSelector((state: RootState) => state.auth.currentUser) as Tuser;
  console.log(curentUse);

  const [notificationUser, setNotificationUser] = useState();
  const [show, setShow] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const curentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;
  const router = useRouter();
  const onClick = () => {
    setShow(!show);
  };
  const readNotification = async (id: any, status: any, userId: any) => {
    try {
      const res = await readedNotification(id);
      const dataRes = await getNotificationApi(userId);
      // setNotificationUser({ ...res, unRead: dataRes.unRead });
      localStorage.setItem("readNo", status);
      router.push("/user/order");
    } catch (error) {
      console.log(error);
      // message.error(`${error.response.message}`, 4);
    }
  };
  const handleSerach = async () => {
    const key = document.getElementById("s");
    // console.log(key.value);
    // if (key.value == "") {
    //   message.warning("Vui lòng nhập từ khóa");
    // } else {
    //   router.push("/product");
    //   localStorage.setItem("search", "true");
    //   try {
    //     const res = await searchProduct(key.value);
    //     console.log(res);
    //     if (res.length == 0) {
    //       message.warning("Không có sản phẩm phù hợp");
    //       dispatch(getProducts());
    //     } else {
    //       message.success(res.length + " sản phẩm phù hợp");
    //       dispatch(filterProductS(res));
    //     }
    //   } catch (error) {
    //     message.error(`${error.response.message}`, 4);
    //   }
    // }
  };

  useEffect(() => {
    return () => {
      if (curentUse) {
        socket.emit("newUser", curentUse?._id);
      }
      socket.on("newNotification", (data) => {
        console.log(data);
        notification.info({
          message: `${moment(data.createdAt).fromNow()}`,
          description: `${data.text}`,
          duration: 15,
          // onClick: async (e) => {
          //   e.target.parentNode.parentNode.parentNode.style.display = "none";
          //   const res = await getOrders(data.orderId);
          //   localStorage.setItem("readNo", res.status);
          //   router.push("/user/order");
          //   readedNotification(data._id)
          //     .then(async (response) => {
          //       const dataRes = await getNotificationApi(data.userId);
          //       setNotificationUser({ ...response, unRead: dataRes.unRead });
          //     })
          //     .catch((error) => {
          //       message.error(`${error}`);
          //     });
          // },
          style: {
            cursor: "pointer",
          },
        });
      });
      socket.on("userListNotification", (data) => {
        console.log(data);
        setNotificationUser(data);
      });
    };
  }, []);
  return (
    <header className="flex flex-wrap">
      <section className="relative mx-auto">
        {/* navbar */}
        <nav className="flex justify-between bg-black text-white w-screen">
          <div className="px-0 xl: py-6 flex w-[1410px] mx-auto items-center">
            <a className="text-3xl font-bold font-heading" href="#">
              <picture>
                <img
                  className="h-12"
                  src="https://res.cloudinary.com/dklgetybe/image/upload/v1671522564/Group_88_gisjuz.png"
                  alt="logo"
                />
              </picture>
            </a>
            {/* Nav Links */}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link className="  hover:text-gray-200" href="/">
                  <a href="" className="text-white">
                    Trang Chủ
                  </a>
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/product">
                  <a href="" className="text-white">
                    Sản Phẩm
                  </a>
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/contact">
                  <a href="" className="text-white">
                    Liên Hệ
                  </a>
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/blogs">
                  <a href="" className="text-white">
                    Tin Tức
                  </a>
                </Link>
              </li>
              {/* <li>
                <a className="hover:text-gray-200" href="#">
                  <a href="" className="text-white">
                    Giới Thiệu
                  </a>
                </a>
              </li> */}
            </ul>
            {/* Header Icons */}
            <div className="hidden xl:flex space-x-5 items-center">
              {/* <a className="hover:text-gray-200 text-white" href="#">         
                <FontAwesomeIcon className="text-2xl" icon={faSearch} />
              </a> */}
              <div style={{ display: "flex" }} className="max-w-lg w-full lg:max-w-xs">
                <input
                  type="text"
                  name="s"
                  id="s"
                  className="block w-full pl-1 pr-3 py-2 border border-transparent rounded-md leading-5 bg-white-200 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Tìm kiếm sản phẩm"
                />

                <button
                  onClick={() => handleSerach()}
                  style={{
                    backgroundColor: "white",
                    width: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  type="submit"
                  id="searchsubmit"
                  className="ml-2 border border-transparent rounded-md"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <a className="flex items-center hover:text-gray-200 text-white" href="#">
                {isLogged ? (
                  <li className="relative group flex items-center ml-3 cursor-pointer before:absolute before:content-[''] before:top-full before:left-0 before:h-2 before:right-0 ">
                    <Link href="/user">
                      <FontAwesomeIcon className="text-2xl mr-5" icon={faUser} />
                    </Link>

                    <img
                      onClick={onClick}
                      width="50%"
                      src="https://img.icons8.com/glyph-neue/64/FFFFFF/appointment-reminders.png"
                    />
                    <li className="relative flex items-center pr-2">
                      <p className="hidden transform-dropdown-show" />
                      <a
                        href="javascript:;"
                        className="block p-0 text-sm text-white transition-all ease-nav-brand"
                        aria-expanded="false"
                      >
                        {/* <Badge
                          count={notificationUser?.unRead > 1 ? notificationUser?.unRead : null}
                          overflowCount={100}
                        >
                          <i className="cursor-pointer fa fa-bell text-3xl text-white" onClick={onClick} />
                        </Badge> */}
                      </a>
                      <ul
                        className={`${
                          show === false ? "hidden" : ""
                        } overflow-y-scroll max-h-96 text-sm mt-[50px] before:font-awesome before:leading-default before:duration-350 before:ease lg:shadow-3xl duration-250 min-w-44 before:sm:right-8 before:text-5.5  absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent dark:shadow-dark-xl dark:bg-slate-850 bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8']`}
                      ></ul>
                    </li>
                    {/* <span className="ml-1 hover:text-[#282828]">
                      <Link href={curentUser.role ? "/admin" : "/user"}>{curentUser.name}</Link>
                    </span> */}
                    <ul className="bg-white hidden group-hover:block absolute top-[calc(100%+8px)] left-0 shadow px-2 py-1 z-[50] divide-y min-w-[150px]">
                      <li className="text-[#282828] text-sm py-1.5 font-semibold hover:text-[#4d8a54]">
                        Tên tài khoản:
                        <a href={curentUser.role ? "/admin" : "/user"} className="text-black">
                          {curentUser.name}
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="relative group flex items-center ml-3 cursor-pointer before:absolute before:content-[''] before:top-full before:left-0 before:h-2 before:right-0">
                    <Link href="/user">
                      <a className="hover:text-gray-200 text-white" href="#">
                        <span className="ml-1 group-hover:text-[#282828]">
                          <FontAwesomeIcon className="text-2xl" icon={faUser} />
                        </span>
                      </a>
                    </Link>
                    <ul className="bg-white hidden group-hover:block absolute top-[calc(100%+8px)] left-0 shadow px-2 py-1 z-[50] divide-y min-w-[150px]">
                      <li className="text-[#282828] text-sm py-1.5 font-semibold hover:text-[#4d8a54]">
                        <Link href="/login">
                          <a href="" className="text-black">
                            Đăng nhập
                          </a>
                        </Link>
                      </li>
                      <li className="text-[#282828] text-sm py-1.5 font-semibold hover:text-[#4d8a54]">
                        <Link href="/register">
                          <a href="" className="text-black">
                            Đăng ký{" "}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </a>
              {/* Sign In / Register      */}
              <Link href={"/cart/order"}>
                <a className="hover:text-gray-200 text-white" href="#">
                  {/* <img src="img/icon/search.png" /> */}
                  <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
                </a>
              </Link>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </a>
        </nav>
      </section>
    </header>
  );
};

export default header;
