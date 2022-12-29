import { Table } from "antd";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminLayout } from "../../../layouts";
import { getallorderdetail, getallorders } from "../../../redux/orders";
import { RootState } from "../../../redux/store";
import { thousandFormat } from "../../../untils";

type Props = {};

const OrderDetail = (props: Props) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { id } = route.query;
  const { orders, orderDetail } = useSelector((state: RootState) => state.orderReducer);
  let dataOrder = orderDetail.filter((item: any) => item.orderId?._id === id);
  console.log(dataOrder);

  const columns: any = [
    {
      title: "Sản phẩm",
      key: "user",
      render: (text: any) => (
        <div className="flex">
          <img src={text.image} width={120} />
          <p className="px-2">{text.name}</p>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      render: (text: any) => (
        <div>
          <span>{text.price}</span>
        </div>
      ),
    },
    {
      title: "Số lượng",
      render: (text: any) => (
        <div>
          <span>{text.quantity}</span>
        </div>
      ),
    },
    {
      title: "Màu sắc",
      render: (text: any) => (
        <div>
          <span>{text.color}</span>
        </div>
      ),
    },
    {
      title: "Kích cỡ",
      render: (text: any) => (
        <div>
          <span>{text.size}</span>
        </div>
      ),
    },
  ];

  const data = dataOrder
    // .sort((a: any, b: any) => a.status - b.status)
    .map((item: any) => {
      return {
        name: item.productId?.name,
        image: item.productId?.image,
        price: item.productId?.price,
        quantity: item.quantity,
        size: item.size?.sizeName,
        color: item.color?.colorName,
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
      <div className="mt-20 px-10 border-b border-gray-700">
        <p>Ngày đặt: {moment(dataOrder[0]?.orderId?.date).format("DD/MM/YYYY")}</p>
        <p>Người nhận: {dataOrder[0]?.orderId?.customerName}</p>
        <p>Đơn hàng {dataOrder[0]?.orderId?.paid == true ? "đã thanh toán" : "chưa thanh toán"}</p>
        <p>Tổng tiền đơn: {thousandFormat(dataOrder[0]?.orderId?.totalPrice)}đ</p>
      </div>
      <div className="p-6 overflow-hidden">
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
