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
                <h2 className='text-2xl'>Trang chủ / Tài khoản</h2>
                <div className=' flex mt-[14px]'>
                    <UserNav />
                    <div className='ml-[60px]'>
                        <h2 className='text-xl'>Thông tin tài khoản</h2>
                        <div className='flex'>
                            <div><picture><img src={currentUser.avatar} alt="" className='w-[200px] h-[120px]' /></picture></div>
                            <div className='ml-[20px] space-y-2'>
                                <div className='text-lg'><span >Họ và tên: </span> <span>{currentUser.name}</span></div>
                                <div className='text-lg'><span >Email: </span> <span >{currentUser.email}</span></div>
                                <div className='text-lg'><span >Số điện thoại: </span> <span >{currentUser.phone}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default User