import { Modal, Table } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserNav from "../../../component/user-nav";
import { getallorderdetail, getallorders } from "../../../redux/orders";
import { RootState } from "../../../redux/store";
type Props = {};

const userCart = (props: Props) => {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  const showModal = (id: any) => {
    setIsModalOpen(true);
    setIdOrder(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const isToggle = (number: number) => {
    setActive(number);
  };
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { orders, orderDetail } = useSelector((state: RootState) => state.orderReducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getallorders());
    dispatch(getallorderdetail());
  }, [dispatch]);

  const order = orders.filter((item: any) => item.userId?._id === currentUser?._id);

  const data0 = order.filter((item: any) => item.status == 0);
  const data1 = order.filter((item: any) => item.status == 1);
  const data2 = order.filter((item: any) => item.status == 2);
  const data3 = order.filter((item: any) => item.status == 3);
  const data4 = order.filter((item: any) => item.status == 4);
  const data5 = order.filter((item: any) => item.status == 5);
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
  const dataOrder = orderDetail?.filter((item: any) => item.orderId?._id === idOrder);
  const data = dataOrder.map((item: any) => {
    return {
      name: item.productId?.name,
      image: item.productId?.image,
      price: item.productId?.price,
      quantity: item.quantity,
      size: item.size?.sizeName,
      color: item.color?.colorName,
    };
  });
  return (
    <div>
      <Modal title="Basic Modal" width={1200} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Table columns={columns} dataSource={data} />;
      </Modal>
      <div className="main w-[1410px] mx-auto mt-[80px]">
        <h2 className="text-2xl">
          Trang chủ/{" "}
          <a href="" className="text-red-500">
            Tài khoản
          </a>
        </h2>
        <div className=" flex mt-[14px]">
          <UserNav />
          <div className="ml-[140px] w-full">
            <h2 className="text-xl my-5">Đơn hàng của bạn</h2>
            {order.length == 0 ? (
              <div className="text-center font-bold text-2xl">Hiện tại bạn chưa có đơn hàng nào</div>
            ) : (
              <div>
                <div>
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
                    className={active == 4 ? "border-b border-orange-500 mx-3 text-lg text-orange-500" : "mx-3 text-lg"}
                  >
                    Hoàn thành
                  </button>
                  <button
                    onClick={() => isToggle(5)}
                    className={active == 5 ? "border-b border-orange-500 mx-3 text-lg text-orange-500" : "mx-3 text-lg"}
                  >
                    Đã hủy
                  </button>
                </div>
                <table className="table-auto text-center border border-black mt-4">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-[60px]">ID</th>
                      <th className="px-[60px]">Người nhận</th>
                      <th className="px-[60px]">SĐT</th>
                      <th className="px-[60px]">Email</th>
                      <th className="px-[60px]">NGÀY</th>
                      <th className="px-[60px]">Tổng tiền </th>
                      <th className="px-[60px]"></th>
                    </tr>
                  </thead>
                  <tbody className={active == 0 ? "" : "hidden"}>
                    {data0 &&
                      data0?.map((item: any) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 1 ? "" : "hidden"}>
                    {data1 &&
                      data1?.map((item: any) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 2 ? "" : "hidden"}>
                    {data2 &&
                      data2?.map((item: any) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 3 ? "" : "hidden"}>
                    {data3 &&
                      data3?.map((item: any) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 4 ? "" : "hidden"}>
                    {data4 &&
                      data4?.map((item: any) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 5 ? "" : "hidden"}>
                    {data5 &&
                      data5?.map((item: any) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{item._id}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default userCart;
