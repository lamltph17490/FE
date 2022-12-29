import React from "react";
import Link from "next/link";
import { getLocalStorage } from "../../../untils/cart";
import { updateOrders, updatePaidOrder } from "../../../Api/orders";
type Props = {};

const index = (props: Props) => {
  React.useEffect(() => {
    const id: any = sessionStorage.getItem("oderId");
    const updateOder = async () => {
      await updatePaidOrder(id, { paid: true });
    };
    updateOder();
  }, []);
  return (
    <div>
      <h1>Thanh toán thành công !</h1>{" "}
      <button>
        <Link href="/">Quay về trang chủ </Link>
      </button>
    </div>
  );
};

export default index;
