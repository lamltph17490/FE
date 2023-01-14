import React, { useState } from "react";
import OrdersPaid from "./ordersPaid";
import OrdersUnpaid from "./ordersUnpaid";
type Props = {};
const ListOrders = (props: Props) => {
  const [active2, setActive2] = useState(0);
  const isToggle2 = (number: number) => {
    setActive2(number);
  };
  return (
    <>
      <div className="mt-10">
        <button
          onClick={() => isToggle2(0)}
          className={
            active2 == 0
              ? "border rounded-md px-4 py-2 bg-red-500 mx-3 text-lg text-white"
              : "border rounded-md px-4 py-2 border-red-500 text-lg mx-3"
          }
        >
          Chưa thanh toán
        </button>
        <button
          onClick={() => isToggle2(1)}
          className={
            active2 == 1
              ? "border rounded-md px-4 py-2 bg-blue-500 mx-3 text-lg text-white"
              : "border rounded-md px-4 py-2 border-blue-500 text-lg mx-3"
          }
        >
          Đã thanh toán
        </button>
      </div>
      <div className={active2 == 0 ? "" : "hidden"}>
        <OrdersUnpaid />
      </div>
      <div className={active2 == 1 ? "" : "hidden"}>
        <OrdersPaid />
      </div>
    </>
  );
};

export default ListOrders;
