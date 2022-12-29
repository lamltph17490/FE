import React, { useState } from "react";
import { message, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getallorderdetail, getallorders, updateOrder } from "../../../redux/orders";
import Link from "next/link";
import moment from "moment";
import { thousandFormat } from "../../../untils";
type Props = {};
const { Option } = Select;
const OrdersPaid = (props: Props) => {
  const [active, setActive] = useState(0);
  const [flag, setFlag] = useState(false);
  const isToggle = (number: number) => {
    setActive(number);
  };
  let { orders } = useSelector((state: RootState) => state.orderReducer);
  orders = orders.filter((item: any) => item.paid === true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getallorders());
    dispatch(getallorderdetail());
  }, [flag]);
  const onChange = (id: any, value: any) => {
    dispatch(updateOrder({ _id: id, status: value }))
      .unwrap()
      .then(() => {
        message.success({ content: "Đổi trạng thái thành công" });
        setFlag(!flag);
      })
      .catch((err: any) => alert(err));
  };
  const dataStatus = [
    { name: "Đang xử lý", value: 0 },
    { name: "Xác nhận đơn hàng", value: 1 },
    { name: "Chờ giao hàng", value: 2 },
    { name: "Đang giao hàng", value: 3 },
    { name: "Hoàn thành", value: 4 },
    { name: "Hủy đơn hàng", value: 5 },
  ];
  const columns: any = [
    {
      title: "Người đặt",
      key: "user",
      render: (text: any) => <a>{text.user}</a>,
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
      title: "Ngày đặt",
      render: (item: any) => <p>{moment(item.date).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "Tổng tiền",
      render: (item: any) => <span>{thousandFormat(item.money)} đ</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
              ? "Đang giao hàng"
              : status === 4
              ? "Hoàn thành"
              : "Hủy đơn hàng"
          }
          onChange={(value: any) => {
            onChange(_id, value);
          }}
        >
          {status == 0
            ? dataStatus
                ?.filter((a: any) => a.value == 0 || a.value == 1 || a.value == 5)
                .map((item: any) => (
                  <Option value={item?.value} key={item?.value}>
                    {item?.name}
                  </Option>
                ))
            : status == 1
            ? dataStatus
                ?.filter((a: any) => a.value == 1 || a.value == 2 || a.value == 5)
                .map((item: any) => (
                  <Option value={item?.value} key={item?.value}>
                    {item?.name}
                  </Option>
                ))
            : status == 2
            ? dataStatus
                ?.filter((a: any) => a.value == 2 || a.value == 3)
                .map((item: any) => (
                  <Option value={item?.value} key={item?.value}>
                    {item?.name}
                  </Option>
                ))
            : status == 3
            ? dataStatus
                ?.filter((a: any) => a.value == 3 || a.value == 4)
                .map((item: any) => (
                  <Option value={item?.value} key={item?.value}>
                    {item?.name}
                  </Option>
                ))
            : status == 4
            ? dataStatus
                ?.filter((a: any) => a.value == 4)
                .map((item: any) => (
                  <Option value={item?.value} key={item?.value}>
                    {item?.name}
                  </Option>
                ))
            : status == 5
            ? dataStatus
                ?.filter((a: any) => a.value == 5)
                .map((item: any) => (
                  <Option value={item?.value} key={item?.value}>
                    {item?.name}
                  </Option>
                ))
            : ""}
        </Select>
      ),
    },
    {
      title: "Chi tiết đơn hàng",
      key: "order",
      render: (item: any) => <Link href={`/admin/orders/${item._id}`}>Chi tiết</Link>,
    },
  ];
  const data0 = orders
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 0)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId?.name,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
        date: item.date,
      };
    });
  const data1 = orders
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 1)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId?.name,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
        date: item.date,
      };
    });
  const data2 = orders
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 2)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId?.name,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
        date: item.date,
      };
    });
  const data3 = orders
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 3)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId?.name,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
        date: item.date,
      };
    });
  const data4 = orders
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 4)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId?.name,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
        date: item.date,
      };
    });
  const data5 = orders
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 5)
    .map((item: any) => {
      return {
        _id: item._id,
        user: item.userId?.name,
        name: item.customerName,
        address: item.address,
        phone: item.phone,
        email: item.email,
        money: item.totalPrice,
        message: item.message,
        status: item.status,
        date: item.date,
      };
    });
  return (
    <>
      <div className="p-6 mt-10 overflow-hidden">
        <div className="my-10">
          <button
            onClick={() => isToggle(0)}
            className={active == 0 ? "border-b border-orange-500 mr-3 text-lg text-orange-500" : "mr-3 text-lg"}
          >
            Đang xử lý
          </button>
          <button
            onClick={() => isToggle(1)}
            className={active == 1 ? "border-b border-orange-500 mx-3 text-lg text-orange-500" : "mx-3 text-lg"}
          >
            Đơn hàng được xác nhận
          </button>
          <button
            onClick={() => isToggle(2)}
            className={active == 2 ? "border-b border-orange-500 mx-3 text-lg text-orange-500" : "mx-3 text-lg"}
          >
            Chờ giao hàng
          </button>
          <button
            onClick={() => isToggle(3)}
            className={active == 3 ? "border-b border-orange-500 mx-3 text-lg text-orange-500" : "mx-3 text-lg"}
          >
            Đang giao
          </button>
          <button
            onClick={() => isToggle(4)}
            className={active == 4 ? "border-b border-blue-700 mx-3 text-lg text-blue-700" : "mx-3 text-lg"}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => isToggle(5)}
            className={active == 5 ? "border-b border-red-600 mx-3 text-lg text-red-600" : "mx-3 text-lg"}
          >
            Đã hủy
          </button>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className={active == 0 ? "" : "hidden"}>
                  <Table columns={columns} dataSource={data0} />
                </div>
                <div className={active == 1 ? "" : "hidden"}>
                  <Table columns={columns} dataSource={data1} />
                </div>
                <div className={active == 2 ? "" : "hidden"}>
                  <Table columns={columns} dataSource={data2} />
                </div>
                <div className={active == 3 ? "" : "hidden"}>
                  <Table columns={columns} dataSource={data3} />
                </div>
                <div className={active == 4 ? "" : "hidden"}>
                  <Table columns={columns} dataSource={data4} />
                </div>
                <div className={active == 5 ? "" : "hidden"}>
                  <Table columns={columns} dataSource={data5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPaid;
