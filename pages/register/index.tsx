import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { addUser } from "../../Api/authApi";
import { Tuser } from "../../models/user";
import {
  faEyeSlash, faEye, faUser, faPhone, faEnvelope, faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {};

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tuser>();
  const onSubmit: SubmitHandler<Tuser> = async (value: Tuser) => {
    try {
      await addUser(value);
      toast.success("Thành công");
    } catch (error) {
      toast.error("Lỗi");
    }
  };

  //show/hiden
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(faEyeSlash)
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(faEye);
      setType('text')
    }
    else {
      setIcon(faEyeSlash);
      setType('password')
    }
  }
  return (
    <div className="w-[1200px] mx-auto">
      <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
          <div className="md:flex w-full">
            <div className="w-3/5 py-10 ">
              <picture>
                <img className="h-[500px] w-full ml-[60px]" src="https://images.pexels.com/photos/14893202/pexels-photo-14893202.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
              </picture>
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">ĐĂNG KÝ</h1>
                <p className="text-lg">Nhập thông tin của bạn để đăng ký
                </p>
              </div>
              <form className="text-lg" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="" className="text-lg font-semibold px-1">Họ và tên</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faUser} /></div>
                      <input type="text" {...register("name", { required: true })} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nhập tên" />
                      {errors.name?.type === "required" && (
                        <span className="text-red-700">Không được để trống</span>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="" className="text-lg font-semibold px-1">Số điện thoại</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faPhone} /></div>
                      <input type="number" {...register("phone", { required: true })} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Nhập SĐT" />
                    </div>
                    {errors.phone?.type === "required" && (
                      <span className="text-red-700">Không được để trống</span>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="" className="text-lg font-semibold px-1 ">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faEnvelope} /></div>
                      <input type="email" {...register("email", { required: true })} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="email@example.com" />
                      {errors.password?.type === "required" && (
                        <span className="text-red-700">Không được để trống</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label htmlFor="" className="text-lg font-semibold px-1">Mật khẩu</label>
                    <div className="flex relative">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={faLock} /></div>
                      <input type={type} {...register("password", { required: true })} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                      <span className="absolute cursor-pointer bottom-[10px] right-[20px]" onClick={handleToggle}><FontAwesomeIcon icon={icon} /></span>
                      {errors.name?.type === "required" && (
                        <span className="text-red-700">Không được để trống</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className="block w-full max-w-xs mx-auto bg-black  focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Đăng ký </button>
                  </div>
                </div>
                <div className="">Bạn đã có tài khoản? <Link href={'/login'}>Đăng nhập ngay</Link> </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
