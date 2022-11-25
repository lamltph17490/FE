import React from 'react'
import { useSelector } from 'react-redux';
import UserNav from '../../component/user-nav'
import { Tuser } from '../../models/user';
import { RootState } from '../../redux/store';

type Props = {}

const User = (props: Props) => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as Tuser;
    return (
        <div>
            <div className="main w-[1410px] mx-auto mt-[80px]">
                <h2 className='text-2xl'>Trang chủ/ <a href="" className='text-red-500'>Tài khoản</a></h2> 
                <div className=' flex mt-[14px]'>
                    <UserNav />
                    <div className='ml-[140px]'>
                        <h2 className='text-xl'>Thông tin tài khoản</h2>
                        <div className='mt-[14px]'>
                            <div className='text-lg'><a href="" >Họ và tên: </a> <a href="">{currentUser.name}</a></div>
                            <div className='text-lg'><a href="" >Email: </a> <a href="">{currentUser.email}</a></div>
                            <div className='text-lg'><a href="" >Số điện thoại: </a> <a href="">{currentUser.phone}</a></div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default User