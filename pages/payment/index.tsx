import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPayment } from "../../Api/orders";
import { getLocalStorage } from "../../untils/cart";
import AlertMessage from "../../untils/alert";
type Props = {};
type Inputs = {
  amount: string;
  bankCode: string;
  orderDescription: string;
};
const index = (props: Props) => {
  const route = useRouter();
  const { success, error } = AlertMessage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const { amount, bankCode, orderDescription } = data;
    console.log({ amount, bankCode, orderDescription });
    await createPayment({ amount, bankCode, orderDescription })
      .then((res: any) => {
        route.push(res);
      })
      .catch((err) => {
        error("thanh toán thất bại");
      });
  };

  useEffect(() => {
    const total: any = sessionStorage.getItem("total");
    reset({
      amount: total,
      bankCode: "NCB",
      orderDescription: "Thanh toán đơn hàng số tiền: " + total + " VNĐ",
    });
  }, []);
  return (
    <div className="container mx-auto my-5">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Số tiền
                  </label>
                  <input
                    type="text"
                    {...register("amount", { required: "không được để trống " })}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="text-red-600 mt-1"> {errors?.amount?.message}</p>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Chọn ngân hàng
                  </label>
                  <select
                    {...register("bankCode")}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Không chọn </option>
                    <option value="VNPAYQR">VNPAYQR</option>
                    <option value="VNBANK">LOCAL BANK</option>
                    <option value="IB">INTERNET BANKING</option>
                    <option value="ATM">ATM CARD</option>
                    <option value="INTCARD">INTERNATIONAL CARD</option>
                    <option value="VISA">VISA</option>
                    <option value="MASTERCARD"> MASTERCARD</option>
                    <option value="JCB">JCB</option>
                    <option value="UPI">UPI</option>
                    <option value="VIB">VIB</option>
                    <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
                    <option value="SCB">Ngan hang SCB</option>
                    <option value="NCB">Ngan hang NCB</option>
                    <option value="SACOMBANK">Ngan hang SacomBank </option>
                    <option value="EXIMBANK">Ngan hang EximBank </option>
                    <option value="MSBANK">Ngan hang MSBANK </option>
                    <option value="NAMABANK">Ngan hang NamABank </option>
                    <option value="VNMART"> Vi dien tu VnMart</option>
                    <option value="VIETINBANK">Ngan hang Vietinbank </option>
                    <option value="VIETCOMBANK">Ngan hang VCB </option>
                    <option value="HDBANK">Ngan hang HDBank</option>
                    <option value="DONGABANK">Ngan hang Dong A</option>
                    <option value="TPBANK">Ngân hàng TPBank </option>
                    <option value="OJB">Ngân hàng OceanBank</option>
                    <option value="BIDV">Ngân hàng BIDV </option>
                    <option value="TECHCOMBANK">Ngân hàng Techcombank </option>
                    <option value="VPBANK">Ngan hang VPBank </option>
                    <option value="AGRIBANK">Ngan hang Agribank </option>
                    <option value="MBBANK">Ngan hang MBBank </option>
                    <option value="ACB">Ngan hang ACB </option>
                    <option value="OCB">Ngan hang OCB </option>
                    <option value="IVB">Ngan hang IVB </option>
                    <option value="SHB">Ngan hang SHB </option>
                  </select>
                  <p className="text-red-600 mt-1"> {errors?.bankCode?.message}</p>
                </div>

                <div className="col-span-6">
                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                    Nội dung giao dịch
                  </label>

                  <textarea
                    cols={50}
                    className="border"
                    {...register("orderDescription", { required: "không được để trống" })}
                  />
                  <p className="text-red-600 mt-1"> {errors?.orderDescription?.message}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
