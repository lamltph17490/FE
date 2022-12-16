import React from "react";
import { message, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateOrder } from "../../../redux/orders";
import Link from "next/link";
type Props = {};
const { Option } = Select;
const ListOrders = (props: Props) => {
  const { orders } = useSelector((state: RootState) => state.orderReducer);
  const dispatch = useDispatch();
  const onChange = (id: any, value: any) => {
    console.log(id, value);
    dispatch(updateOrder({ _id: id, status: value }))
      .unwrap()
      .then(() => {
        message.success({ content: "Đổi trạng thái thành công" });
      })
      .catch((err: any) => alert(err));
  };
  const dataStatus = [
    { name: "Đang xử lý", value: 0 },
    { name: "Xác nhận đơn hàng", value: 1 },
    { name: "Chờ giao hàng", value: 2 },
    { name: "Đang giao hàng", value: 3 },
    { name: "Nhận hàng thành công", value: 4 },
    { name: "Hủy đơn hàng", value: 5 },
  ];
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đang xử lý", value: 0 },
        { text: "Xác nhận đơn hàng", value: 1 },
        { text: "Chờ giao hàng", value: 2 },
        { text: "Đang giao hàng", value: 3 },
        { text: "Nhận hàng thành công", value: 4 },
        { text: "Hủy đơn hàng", value: 5 },
      ],
      // onFilter: (value: number, record: any) => record.status.indexOf(value) === 0,
      filterSearch: true,
      render: (_: any, { _id, status }: any) => (
        <Select
          style={{ minWidth: "150px" }}
          value={
            status === 0
              ? "Đang xử lý"
              : status === 1
              ? "Xác nhận đơn hàng"
              : status === 2
              ? "Chờ giao hàng"
              : status === 3
              ? "Chờ giao hàng"
              : status === 4
              ? "Nhận hàng thành công"
              : "Hủy đơn hàng"
          }
          onChange={(value: any) => {
            onChange(_id, value);
          }}
        >
          {dataStatus?.map((item: any) => (
            <Option value={item?.value} key={item?.value}>
              {item?.name}
            </Option>
          ))}
        </Select>
      ),
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
  return (
    <>
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

export default ListOrders;
