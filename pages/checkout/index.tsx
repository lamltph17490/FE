import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { addOrderDetail } from "../../Api/orderDetail";
import { addOrders } from "../../Api/orders";
import { RootState } from "../../redux/store";
import { thousandFormat } from "../../untils";
import AlertMessage from "../../untils/alert";
import { getLocalStorage, sumTotal } from "../../untils/cart";
import { Tuser } from "../../models/user";
import { useRouter } from "next/router";
import { useVoucher } from "../../Api/voucheApi";
type Inputs = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  message: string;
  payment: string;
};
type Props = {};

const CheckOut = (props: Props) => {
  const [cart, setCart] = useState<any>([]);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;
  const route = useRouter();
  const [priceVoucher, setPriceVoucher] = useState(0);
  const { success, error, confirmCustom } = AlertMessage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const handleUseVoucher = async () => {
    const codeVou = document.getElementById("voucherCode");
   try {
    const data = await useVoucher( {code:codeVou.value, price: total})
    setPriceVoucher(data)
    message.success("Áp voucher thành công");
   } catch (error) {
    setPriceVoucher(0)
     message.error(`${error.response?.data?.message}`);  
   }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const payment = data.payment;
    if (data) {
      data = {
        customerName: data.customerName,
        address: data.address,
        phone: data.phone,
        email: data.email,
        message: data.message,
        date: new Date(),
      };
      await addOrders({
        ...data,
        totalPrice: total - priceVoucher,
        userId: currentUser?._id,
      })
        .then((res: any) => {
          // console.log(res._id);
          sessionStorage.setItem("oderId", res._id);
          return cart?.map((item: any) =>
            addOrderDetail({
              orderId: res._id,
              productId: { ...item?.id },
              quantity: item?.quantity,
              size: item?.size,
              color: item?.color,
            }),
          );
        })
        .then(() => {
          if (payment === "cod") {
            confirmCustom(
              "Đặt hàng thành công !",
              "Đơn hàng của bạn đang được xử lý",
              "Tiếp tục mua hàng",
              "Về trang chủ",
              () => {
                return route.push("/product");
              },
              () => {
                return route.push("/");
              },
            );
          } else {
            success("Đặt hàng thành công,đi tới trang thanh toán");
            localStorage.removeItem("cart");
            sessionStorage.setItem("total", total - priceVoucher);
            setTimeout(() => {
              return route.push("/payment");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          error(err);
        });
    }
  };

  let total = cart?.reduce((sum: any, i: any) => {
    return sum + i?.id?.price * i?.quantity;
  }, 0);
  useEffect(() => {
    reset(currentUser);
    setCart(getLocalStorage("cart"));
    console.log(cart);
  }, []);
  return (
    <>
      <div className="mt-[60px]">
        <h1 className="flex items-center justify-center font-bold text-md lg:text-3xl">Trang Thanh Toán</h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">Địa chỉ thanh toán</h2>
            <form className="justify-center w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full  ">
                    <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">
                      Tên
                    </label>
                    <input
                      type="text"
                      placeholder="tên"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("customerName", { required: "không được để trống" })}
                    />
                    <p className="text-red-600 mt-1"> {errors?.customerName?.message}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label htmlFor="Email" className="block mb-3 text-sm font-semibold text-gray-500">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("email", { required: "không được để trống" })}
                    />
                    <p className="text-red-600 mt-1"> {errors?.email?.message}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label htmlFor="Email" className="block mb-3 text-sm font-semibold text-gray-500">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("phone", { required: "không được để trống" })}
                    />
                    <p className="text-red-600 mt-1"> {errors?.phone?.message}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label htmlFor="Địa chỉ" className="block mb-3 text-sm font-semibold text-gray-500">
                      Địa chỉ
                    </label>
                    <textarea
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      cols={20}
                      rows={4}
                      placeholder="Địa chỉ"
                      {...register("address", { required: "không được để trống" })}
                    />
                    <p className="text-red-600 mt-1"> {errors?.address?.message}</p>
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full ">
                    <label htmlFor="city" className="block mb-3 text-sm font-semibold text-gray-500">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      placeholder="Thành phố"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("city", { required: "không được để trống " })}
                    />
                    <p className="text-red-600 mt-1"> {errors?.city?.message}</p>
                  </div>
                </div>

                <div className="relative pt-3 xl:pt-6">
                  <label htmlFor="note" className="block mb-3 text-sm font-semibold text-gray-500">
                    {" "}
                    Ghi chú
                  </label>
                  <textarea
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows={4}
                    placeholder=""
                    {...register("message")}
                  />
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label htmlFor="note" className="block mb-3 text-sm font-semibold text-gray-500">
                    {" "}
                    Chọn phương thức thanh toán
                  </label>
                  <div className="">
                    <label htmlFor="" className="p-1">
                      <input
                        type="radio"
                        id=""
                        {...register("payment", { required: "vui lòng chọn phương thúc thanh toán", value: "cod" })}
                        value="cod"
                        className=""
                      />
                      <span className="p-1">Thanh toán khi nhận hàng</span>
                    </label>
                    <label htmlFor="" className="p-1">
                      <input
                        type="radio"
                        id=""
                        {...register("payment", { required: "vui lòng chọn phương thúc thanh toán" })}
                        value="online"
                      />
                      <span className="p-1">Thanh toán online</span>
                    </label>
                    <p className="text-red-600 mt-1"> {errors?.payment?.message}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Thanh toán</button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Tổng thanh toán</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  {cart?.map((item: any,index:any) => (
                    <div className="flex space-x-4" key={index}>
                      <div>
                        <img src={item?.id?.image} alt="image" className="w-60 max-h-30" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{item?.id?.name}</h2>
                        {/* <p className="text-sm" dangerouslySetInnerHTML={{ __html: item?.id?.desc }}></p> */}
                        <span className="">Giá</span>{" "}
                        {thousandFormat(sumTotal(item?.id?.price, item?.quantity))}đ
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  ))}
                  <div className="lg:w-2/2">
                    <div className="mt-4">
                      <div className="px-4 py-4 rounded-md">
                        <label htmlFor="coupon code" className="font-semibold text-gray-600">
                          Nhập mã khuyến mãi
                        </label>
                        <input
                          id="voucherCode"
                          type="text"
                          placeholder="Nhập mã"
                          className="
            w-full
            px-2
            py-2
            border border-blue-600
            rounded-md
            outline-none
          "
                        />
                        <span className="block text-green-600"></span>
                        <button
                        onClick={() => handleUseVoucher()}
                          className="
            px-6
            py-2
            mt-2
            text-sm text-indigo-100
            bg-indigo-600
            rounded-md
            hover:bg-indigo-700
          "
                        >
                          Áp mã
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex space-x-4">
                <div>
                  <img
                    src="https://source.unsplash.com/collection/190727/1600x900"
                    alt="image"
                    className="w-60"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Title</h2>
                  <p className="text-sm">Lorem ipsum dolor sit amet, tet</p>
                  <span className="text-red-600">Price</span> $20
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div> */}
                </div>
              </div>
              {/* <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS 2</h2>
              </div> */}
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Giảm giá<span className="ml-2">{thousandFormat(priceVoucher)} VNĐ</span>
              </div>
             
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Tổng tiền<span className="ml-2">{thousandFormat(total - priceVoucher)} VNĐ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
