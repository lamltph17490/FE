import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tuser } from '../../models/user';
import { logout } from '../../redux/auth';
import { RootState } from '../../redux/store';
import { toast } from "react-toastify";
type Props = {}

const UserNav = (props: Props) => {
    const router = useRouter();
    const dispacth = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;

    const handleLogout = () => {
        dispacth(logout());
        toast.success("Đăng xuất thành công");
      };
    

    return (
        <div className='w-[200px]'>
            <h2 className='text-xl'>Trang tài khoản</h2>
            <div className='mt-[14px]'>
                <span><a href="" className='text-lg'>Xin chào: </a><a href="" className='text-red-500 text-lg'>{currentUser.name}</a></span>
            </div>

            <ul className=' text-lg'>
                <li><Link href="/user" className='mb-8'>Thông tin tài khoản</Link></li>
                <li><Link href="/user/userCart" className='mb-[12px]'>Đơn hàng của bạn</Link></li>
                <li><Link href="/user/changePassword" className='mb-[12px]'>Đổi lại mật khẩu</Link></li>
                <li className='mb-[12px]' onClick={handleLogout}>Đăng xuất</li>

            </ul>
        </div>
    )
}

export default UserNav