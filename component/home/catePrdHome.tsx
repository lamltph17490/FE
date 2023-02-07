import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tblog } from '../../models/blogs';
import { getprdCates } from '../../redux/prdCateSlice';
import { RootState } from '../../redux/store';

type Props = {
  posts: Tblog[];
}

const CateHome = (props: Props) => {
  const cateProduct = useSelector((state: RootState) => state.prdCate.prdCates);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getprdCates());
  }, [dispatch]);
  return (
    <div className="w-[1410px] mx-auto  flex-wrap  flex justify-center">
        {cateProduct.slice(0, 4)?.map((item, index) => (
          <div className="cate_item lg:w-1/5  md:w-2/5 pr-4 pl-4" key={index}>
            <a href="#">
              <picture>
                <img src={item.image} className="rounded-full max-w-full h-auto border" alt="" />
              </picture>
            </a>
            <h5 className="text-center title mt-3 mb-3">
              <a href="#" className='text-black'>{item.name}</a>
            </h5>
          </div>
          ))}
        </div>
  )
}

export default CateHome