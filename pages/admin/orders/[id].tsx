import { Table } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminLayout } from "../../../layouts";
import { getallorderdetail, getallorders } from "../../../redux/orders";
import { RootState } from "../../../redux/store";

type Props = {};

const OrderDetail = (props: Props) => {
  const dispatch = useDispatch();
  const { orders, orderDetail } = useSelector((state: RootState) => state.orderReducer);
  const columns: any = [
    {
      title: "Người đặt",
      key: "user",
      render: (text: any) => <a>{text.user.name}</a>,
    },
    {
      title: "Người nhận",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Tổng tiền",
      key: "money",
      dataIndex: "money",
    },
    {
      title: "Chi tiết đơn hàng",
      key: "order",
      render: (item: any) => <Link href={`/admin/orders/${item._id}`}>Chi tiết</Link>,
    },
  ];
  const data = orders
    .sort((a: any, b: any) => a.status - b.status)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
      };
    });
  React.useEffect(() => {
    dispatch(getallorders());
    dispatch(getallorderdetail());
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Chi tiết đơn hàng</title>
      </Head>
      <header className="z-10 fixed top-0 eft-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative mb-0 pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Quản lý đơn hàng
          </h5>
          <span>Chi tiết đơn hàng</span>
        </div>
      </header>
      <div className="p-6 mt-24 overflow-hidden">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table columns={columns} dataSource={data} />;
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
OrderDetail.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
export default OrderDetail;
