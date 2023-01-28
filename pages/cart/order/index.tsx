import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  decreaseItemInCart,
  getLocalStorage,
  increaseItemInCart,
  removeItemInCart,
  sumTotal,
} from "../../../untils/cart";
import AlertMessage from "../../../untils/alert";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { thousandFormat } from "../../../untils";
type Props = {};

const Cart = (props: Props) => {
  const router = useRouter();
  const [cart, setCart] = useState<any>([]);
  const [reload, setReload] = useState<any>(true);
  const { success, error } = AlertMessage();
  const remove = (id: any) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa không?",
      text: "Không thể hoàn tác sau khi xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng chắc chắn rồi!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeItemInCart(id, () => {
          // success("xóa thành công");
          setReload(!reload);
        });
        Swal.fire("Thành công!", "Xóa thành công.", "success");
      }
    });
    // if (window.confirm("bạn có muốn xóa không ?")) {
    //   removeItemInCart(id, () => {
    //     success("xóa thành công");
    //     setReload(!reload);
    //   });
    // }
  };
  const increaseItem = (id: any) => {
    increaseItemInCart(id, () => {
      setReload(!reload);
    });
  };
  const decreaseItem = (id: any) => {
    decreaseItemInCart(id, () => {
      setReload(!reload);
    });
  };
  let total = 0;
  // let total = cart.reduce((a:any,b:any)=>{
  //   return a.
  // },0)
  useEffect(() => {
    setCart(getLocalStorage("cart"));
  }, [reload]);

  return (
    <>
      {cart == undefined || cart == "" ? (
        <div className="text-center text-xl my-4 font-bold">Giỏ hàng của bạn hiện tại chưa có sản phẩm nào!</div>
      ) : (
        <div className="container p-8 mx-auto mt-12">
          <div className="w-full overflow-x-auto">
            <div className="my-2">
              <h3 className="text-xl font-bold tracking-wider">Giỏ hàng</h3>
            </div>
            <table className="w-full shadow-inner">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Ảnh</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Tên sản phẩm</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Màu sắc</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">kích cỡ</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Số lượng</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Giá</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Xoá</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart?.map((item: any) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex justify-center">
                          <img src={item?.id?.image} className="object-cover h-28 w-28 rounded-2xl" alt="image" />
                        </div>
                      </td>
                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center justify-center">
                          <h3>{item?.id?.name}</h3>
                        </div>
                      </td>
                      <td className="p-4 px-6 text-center whitespace-nowrap">{item?.color?.colorName}</td>
                      <td className="p-4 px-6 text-center whitespace-nowrap">{item?.size?.sizeName}</td>
                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        <div>
                          <button
                            onClick={() => {
                              decreaseItem(item?.randomid);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-flex w-6 h-6 text-red-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <span className="mx-3">{item?.quantity}</span>
                          <button
                            onClick={() => {
                              increaseItem(item?.randomid);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-flex w-6 h-6 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        {sumTotal(item?.id?.price, item?.quantity)}
                      </td>
                      <td className="hidden"> {(total += sumTotal(item?.id?.price, item?.quantity))}</td>
                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        <button onClick={() => remove(item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
           
            <div className="mt-4">
              <div className="py-4 rounded-md shadow">
                <h3 className="text-xl font-bold text-blue-600">Tổng tiền</h3>
                <div className="flex justify-between px-4">
                  <span className="font-bold">Tổng thu</span>
                  <span className="font-bold">{thousandFormat(total)} VNĐ</span>
                </div>
                <div className="flex justify-between px-4">
                  <span className="font-bold">Giảm giá</span>
                  <span className="font-bold text-red-600">-20.000VNĐ</span>
                </div>
                {/* <div className="flex justify-between px-4">
                  <span className="font-bold">Sales Tax</span>
                  <span className="font-bold">$2.25</span>
                </div> */}
                <div
                  className="
          flex
          items-center
          justify-between
          px-4
          py-2
          mt-3
          border-t-2
        "
                >
                  <span className="text-xl font-bold">Tổng</span>
                  <span className="text-2xl font-bold">{total}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="
        w-[200px]
        py-2
        text-center text-white
        bg-blue-500
        rounded-md
        shadow
        hover:bg-blue-600
        
      "
                onClick={() => {
                  router.push("/checkout");
                }}
              >
                Tới trang thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
