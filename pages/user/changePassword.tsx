import { useRouter } from 'next/router';
import React from 'react'
import {SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import UserNav from '../../component/user-nav'
import { Tuser } from '../../models/user';
import { RootState } from '../../redux/store';
import { toast } from "react-toastify";
import { changePass } from '../../Api/userApi';
import { NextPageWithLayout } from '../../models/layout';
type Props = {}
type Inputs = {
    _id: string;
    oldPassword: string;
    newPassword: string;
    createdAt?: Date;
  };

const ChangePassword :NextPageWithLayout  = (props: Props) => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;
    console.log(currentUser._id);
    const router = useRouter();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();
  
    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
      try {
        await changePass(values);
        toast.success("Đổi thành công, vui lòng đăng nhập");
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    };
    return (
        <div>
            <div className="main w-[1410px] mx-auto mt-[80px]">
                <h2 className='text-2xl'>Trang chủ/ <a href="" className='text-red-500'>Tài khoản</a></h2>
                <div className=' flex mt-[14px]'>
                    <UserNav />
                    <div className='ml-[140px]'>
                        <h2 className='text-xl'>Đổi mật khẩu</h2>
                        <form className='mt-[14px]' onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" {...register("_id")} className="hidden" value={currentUser._id} />
                            <div className='mb-8'>
                                <label htmlFor="">Mật khẩu cũ</label><br />
                                <input type="text"  {...register("oldPassword", { required: "Vui lòng" })} className='mt-2 w-[400px] h-[40px] border'/>
                                <p className="text-red-400">{errors.oldPassword?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="">Mật khẩu mới</label><br />
                                <input type="text" {...register("newPassword", { required: "Vui lòng nhập họ tên" })} className='mt-2 w-[400px] h-[40px] border'/>
                                <p className="text-red-400">{errors.newPassword?.message}</p>
                            </div>
                            <button className='bg-black text-white text-center w-[160px] h-[38px] mt-4 rounded-full'>Đổi mật khẩu</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword