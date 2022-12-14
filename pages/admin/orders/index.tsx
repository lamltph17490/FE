import Head from "next/head";
import React, { ReactElement } from "react";
import { AdminLayout } from "../../../layouts";
import ListOrders from "./lists";

type Props = {};

const Orders = (props: Props) => {
  return (
    <>
      <Head>
        <title>Danh sách mã giảm giá</title>
      </Head>
      <header className="z-10 fixed top-0 eft-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative mb-0 pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Quản lý đơn hàng
          </h5>
          <span>Danh sách đơn hàng</span>
        </div>
      </header>
      <ListOrders />
    </>
  );
};
Orders.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
export default Orders;
