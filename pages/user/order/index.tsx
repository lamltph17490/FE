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
  const [flag, setFlag] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { orders, orderDetail } = useSelector((state: RootState) => state.orderReducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getallorders());
    dispatch(getallorderdetail());
  }, [flag]);
  // const [order, setOrder] = useState<any>([]);
  const order = orders.filter((item: any) => item.userId?._id === currentUser?._id);
  const data0 = order
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 0);
  const data1 = order
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 1);
  const data2 = order
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 2);
  const data3 = order
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 3);
  const data4 = order
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 4);
  const data5 = order
    .sort((b: any, a: any) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item: any) => item.status == 5);
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

  const onUpdateOrder = (values: any) => {
    Swal.fire({
      title: values.message,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        if (values.status == 0) {
          dispatch(updateOrder({ _id: values._id, status: values.status, date: new Date() }))
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
        } else if (values.status == 5) {
          dispatch(updateOrder({ _id: values._id, status: values.status }))
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
      }
    });
  };
  return (
    <div>
      <Modal
        title={`Chi tiết đơn hàng ( Mã Đơn: ${idOrder} )`}
        width={1200}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          <div className="ml-[140px] w-full min-h-[400px]">
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
                <table className={styles.table}>
                  <thead className="bg-black text-white">
                    <tr>
                      <th>STT</th>
                      <th>Người nhận</th>
                      <th>SĐT</th>
                      <th>Email</th>
                      <th>Ngày đặt</th>
                      <th>Tổng tiền </th>
                      <th colSpan={2}></th>
                    </tr>
                  </thead>
                  <tbody className={active == 0 ? "" : "hidden"}>
                    {data0 &&
                      data0?.map((item: any, index: number) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer text-blue-600">
                            Chi tiết
                          </td>
                          <td
                            onClick={() =>
                              onUpdateOrder({ _id: item._id, status: 5, message: "Bạn có muốn hủy đơn hàng không?" })
                            }
                            className="cursor-pointer text-red-600"
                          >
                            Hủy đơn hàng
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 1 ? "" : "hidden"}>
                    {data1 &&
                      data1?.map((item: any, index: number) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer text-blue-600">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 2 ? "" : "hidden"}>
                    {data2 &&
                      data2?.map((item: any, index: number) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer text-blue-600">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 3 ? "" : "hidden"}>
                    {data3 &&
                      data3?.map((item: any, index: number) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer text-blue-600">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 4 ? "" : "hidden"}>
                    {data4 &&
                      data4?.map((item: any, index: number) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer text-blue-600">
                            Chi tiết
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className={active == 5 ? "" : "hidden"}>
                    {data5 &&
                      data5?.map((item: any, index: number) => (
                        <tr className="py-[10px]" key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.customerName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                          <td>{item.totalPrice}</td>
                          <td onClick={() => showModal(item._id)} className="cursor-pointer text-blue-600">
                            Chi tiết
                          </td>
                          <td
                            onClick={() =>
                              onUpdateOrder({ _id: item._id, status: 0, message: "Mua lại sản phẩm này?" })
                            }
                            className="cursor-pointer text-blue-600"
                          >
                            Mua lại
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
