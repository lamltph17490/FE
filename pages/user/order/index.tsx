import { Modal, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import UserNav from "../../../component/user-nav";
import { getallorderdetail, getallorders, updateOrder } from "../../../redux/orders";
import { RootState } from "../../../redux/store";
import AlertMessage from "../../../untils/alert";
import styles from "./order.module.css";
import OrderPaid from "./orderPaid";
import OrderUnpaid from "./orderUnpaid";
type Props = {};

const UserCart = (props: Props) => {
  const [active2, setActive2] = useState(0);
  const isToggle2 = (number: number) => {
    setActive2(number);
  };

  return (
    <>
      <div className=" float-right mr-[80px]">
        <button
          onClick={() => isToggle2(0)}
          className={
            active2 == 0
              ? "border rounded-md px-4 py-2 bg-red-500 mx-3 text-lg text-white"
              : "border rounded-md px-4 py-2 border-red-500 text-lg mx-3"
          }
        >
          Thanh toán khi nhận hàng
        </button>
        <button
          onClick={() => isToggle2(1)}
          className={
            active2 == 1
              ? "border rounded-md px-4 py-2 bg-blue-500 mx-3 text-lg text-white"
              : "border rounded-md px-4 py-2 border-blue-500 text-lg mx-3"
          }
        >
          Thanh toán online
        </button>
      </div>
      <div className="">
        <div className={active2 == 1 ? "" : "hidden"}>
          <OrderPaid />
        </div>
        <div className={active2 == 0 ? "" : "hidden"}>
          <OrderUnpaid />
        </div>
      </div>
    </>
  );
};

export default UserCart;
