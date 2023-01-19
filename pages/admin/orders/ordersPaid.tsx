import React, { useRef, useState } from "react";
import { InputRef, message, Select, Space, Table, Input, Button, Modal, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getallorderdetail, getallorders, updateOrder } from "../../../redux/orders";
import Link from "next/link";
import moment from "moment";
import { thousandFormat } from "../../../untils";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { datareason } from "../../../untils/dataFake";
import Swal from "sweetalert2";
type Props = {};
const { Option } = Select;
const OrdersPaid = (props: Props) => {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [cancelData, setCancelData] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [active, setActive] = useState(0);
  const [flag, setFlag] = useState(false);
  const [reason, setReason] = useState("");
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
  const showModal2 = (values: any) => {
    setIsModalOpen2(true);
    setCancelData(values);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
    // console.log({ reason: reason, cancelData });
    // return;
    if (cancelData) {
      dispatch(updateOrder({ _id: cancelData.id, status: cancelData.status, reason: reason }))
        .unwrap()
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          setFlag(!flag);
        })
        .catch((err: any) => alert(err));
    }
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const onChangeReason = (e: any) => {
    setReason(e.target.value);
  };

  const onChange = (id: any, value: any) => {
    if (value == 5) {
      return showModal2({
        status: value,
        id: id,
      });
    } else {
      dispatch(updateOrder({ _id: id, status: value }))
        .unwrap()
        .then(() => {
          message.success({ content: "Đổi trạng thái thành công" });
          setFlag(!flag);

        })
        .catch((err: any) => alert(err));
    }
  };
  const dataStatus = [
    { name: "Đang xử lý", value: 0 },
    { name: "Xác nhận đơn hàng", value: 1 },
    { name: "Chờ giao hàng", value: 2 },
    { name: "Đang giao hàng", value: 3 },
    { name: "Hoàn thành", value: 4 },
    { name: "Hủy đơn hàng", value: 5 },
  ];
  // search

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //   end search
  const columns: any = [
    {
      title: "MĐH",
      key: "mdh",
      dataIndex: "_id",
      ...getColumnSearchProps("_id"),
    },
    // {
    //   title: "Người đặt",
    //   key: "user",
    //   render: (text: any) => <a>{text.user}</a>,
    // },
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
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
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
  let data5 = orders
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
      <Modal title={`Lý do hủy đơn hàng`} width={800} open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
        <Radio.Group onChange={onChangeReason}>
          <Space direction="vertical">
            {datareason?.map((item: any, index: number) => (
              <Radio value={item.value} key={index}>
                {item.value}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
      <div className="p-6 overflow-hidden">
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
