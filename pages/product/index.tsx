import { current } from '@reduxjs/toolkit';
import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../Api/prdApi';
import { filterProduct } from '../../Api/products';
import { ClientLayout } from '../../layouts'
import { Tprd } from '../../models/prd';
import { TprdCate } from '../../models/prdCate';
import { getprdCates } from '../../redux/prdCateSlice';
import { filterProductS, getProducts } from '../../redux/prdSlice';
import { RootState } from '../../redux/store';

import ProductCard from './components/ProductCard';


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
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getPro = async () => {
      const data = await getAll();
      console.log(data);
      setProduct(data)
    }
    getPro()
    dispatch(getProducts());
    dispatch(getprdCates())
  }, [dispatch]);

  const { prdCates } = useSelector((state: RootState) => state.prdCate)
  // console.log("cate", prdCates);

  const handleFiler = async () => {
    const getChooseFilter = document.querySelectorAll("#filter")
    console.log(product);
    let productFilter = []
    let flag = false
    getChooseFilter.forEach((current) => {
      if (current.checked == true){
        flag = true
        product.forEach((cur) => {
          if(cur.categoryId._id == current.getAttribute("data")) {
            productFilter.push(cur)
          }
        })
        console.log(productFilter); 
      }
    })
    if(flag == false) {
      dispatch(filterProductS(product));
    }else{
      dispatch(filterProductS(productFilter));  
    }
  }

  const handleDeleteFilter = () => {
    const getChooseFilter = document.querySelectorAll("#filter")
    console.log(getChooseFilter);
    getChooseFilter.forEach((item) => {
      item.checked = false
      dispatch(filterProductS(product));
    })
  }

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
                      Danh mục
                    </h2>
                    <button
                    onClick={() => handleDeleteFilter()}
                      className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
                      aria-label="Clear All"
                    >
                      Xoá hết
                    </button>
                  </div>
                  <div className="mt-2 flex flex-col space-y-4">

                    {
                      prdCates?.map((item: any, index) => (
                        <span className="ms-4 -mt-0.5 ml-[15px] text-normal" key={index}>
                          <label className="group flex items-center text-heading text-sm cursor-pointer">
                            <input
                              data={item._id}
                              onClick={() => handleFiler()}
                              id='filter'
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
          <ProductCard />
        </div>
      </div>

    </>

  )
}

Product.getLayout = (page: ReactElement) => <ClientLayout>{page}</ClientLayout>
export default Product