import { TableProps } from 'antd';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ClientLayout } from '../../layouts'
import { Tprd } from '../../models/prd';
import { TprdCate } from '../../models/prdCate';
import { getprdCates } from '../../redux/prdCateSlice';
import { getProducts } from '../../redux/prdSlice';
import { RootState } from '../../redux/store';
import { thousandFormat } from '../../untils';
import styles from './cate.module.css'
import ProductCard from './components/ProductCard';
import Paginate from '../../component/Paginate';
import { Header } from 'antd/lib/layout/layout';

type Props = {
  products: Tprd[];
  cateProduct: TprdCate[];
};
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}


const Product = (props: Props) => {
  const products = useSelector((state: RootState) => state.prd.products);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getprdCates())
  }, [dispatch]);
  
  const { prdCates } = useSelector((state: RootState) => state.prdCate)
  // console.log("cate", prdCates);
  

  return (
    <>
      <nav className="relative w-[1410px] mx-auto flex flex-wrap items-center justify-between py-8 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <nav className="bg-grey-light rounded-md w-full" aria-label="breadcrumb">
            <ol className="list-reset flex">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-600">
                  Trang chủ
                </a>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-600">
                  Sản phẩm
                </a>
              </li>

            </ol>
          </nav>
        </div>
      </nav>
      {/* AdminBreadcrumb Section End */}
      {/* Shop Section Begin */}
      <div className="w-[1410px] mx-auto pt-[50px]">
        <div className="flex flex-no-wrap">
          <div className="lg:w-1/4 pr-4 pl-4">
            <div className="flex-hidden lg:block">
              <div className="pt-1">
                <div className="block border-b border-gray-300 pb-7 mb-7">
                  <div className="flex items-center justify-between mb-2.5">
                    <h2 className="font-semibold text-heading text-xl md:text-2xl">
                      Lọc sản phẩm
                    </h2>
                    <button
                      className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
                      aria-label="Clear All"
                    >
                      Xoá hết
                    </button>
                  </div>
                  <div className="flex flex-wrap -m-1.5 pt-2" />
                </div>
                <div className="block border-b border-gray-300 pb-7 mb-7">
                  <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
                    Danh mục
                  </h3>
                  <div className="mt-2 flex flex-col space-y-4">

                    {
                      prdCates?.map((item: any,index) => (
                        <span className="ms-4 -mt-0.5 ml-[15px] text-normal" key={index}>
                          <label className="group flex items-center text-heading text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="mr-2 form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading"
                              name="woman"
                              defaultValue="woman"
                            />
                            {item.name}
                          </label>

                        </span>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>      
          <ProductCard/>                
        </div>
      </div>

    </>

  )
}

Product.getLayout = (page: ReactElement) => <ClientLayout>{page}</ClientLayout>
export default Product