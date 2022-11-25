import { TableProps } from 'antd';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ClientLayout } from '../../layouts'
import { Tprd } from '../../models/prd';
import { TprdCate } from '../../models/prdCate';
import { getprdCates } from '../../redux/prdCateSlice';
import { getProducts } from '../../redux/prdSlice';
import { RootState } from '../../redux/store';
import styles from './cate.module.css'


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
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const {prdCates} = useSelector((state:RootState)=>state.prdCate)
  console.log("cate",prdCates);

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
            <div className="flex hidden lg:block">
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
                        prdCates?.map((item:any)=>(
                          <span className="ms-4 -mt-0.5 ml-[15px] text-normal">
                        <label className="group flex items-center text-heading text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading"
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

          <div className="grid grid-cols-3 gap-[30px] lg:w-3/4 mx-auto pt-6 ml-[30px] ">
            {products?.map((item, index) => (
              <div className="w-full pb-8" key={index}>
                <div className="p-0 bg-light group text-center">
                  <div className="block mb-2">
                    <div className="relative overflow-hidden">
                      <div className="mb-5 overflow-hidden">
                        <picture>
                          <img
                            className="object-cover w-full mx-auto transition-all h-[350px] group-hover:scale-110"
                            src={item.image}
                            alt=""
                          />
                        </picture>

                      </div>
                      <div className="absolute flex flex-col top-4 right-4">
                        <div className="flex items-center">
                          <div className="relative flex items-center justify-center p-3 mb-3 text-white transition-all translate-x-20 bg-gray-700 rounded group-hover:translate-x-0 wishlist hover:bg-blue-600 group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              fill="currentColor"
                              className="bi bi-heart"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="relative flex items-center justify-center p-3 mb-3 text-white transition-all translate-x-20 bg-gray-700 group-hover:translate-x-0 wishlist hover:bg-blue-600 group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              fill="currentColor"
                              className="bi bi-cart2 "
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href="">
                    <h3 className="mb-2 text-xl font-normal text-[#999999] uppercase">
                      {item.name}
                    </h3>
                    </Link>
                    <p className="text-lg font-semibold text-[#A71010] ">
                      {/* <span className="text-lg mr-[8px] font-semibold text-gray-400 line-through ">
                      $33.69
                    </span> */}
                      <span>${item.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
              <li>
                <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" ></path></svg>
                </a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" ></path></svg>
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </div>
      </div>

    </>

  )
}
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch("http://localhost:8000/api/product");
//   const products = await res.json();

//   const req = await fetch("http://localhost:8000/api/Cateproduct");
//   const cateProduct = await req.json();

//   return {
//     props: {
//       products,
//       cateProduct,
//     },
//     revalidate: 60,
//   };
// };
Product.getLayout = (page: ReactElement) => <ClientLayout>{page}</ClientLayout>
export default Product
