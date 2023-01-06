import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tprd } from '../../models/prd';
import { getProducts } from '../../redux/prdSlice';
import { RootState } from '../../redux/store';

type Props = {
    products: Tprd[];
}

const PrdHome = (props: Props) => {
    const products = useSelector((state: RootState) => state.prd.products);
    const dispatch = useDispatch<any>();

    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
  return (
    <div>

        <section className="grid grid-cols-4 gap-[30px] w-[1410px] mx-auto pt-20 ">
        {products?.slice(0, 8)?.map((item:any, index) => (
          // eslint-disable-next-line react/jsx-key
          <Link href={`/product/${item._id}`}>
              <div className="cursor-pointer w-full pb-8" key={index}>
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
                    
                    <h3 className="mb-2 text-xl font-normal text-[#999999] uppercase">
                      {item.name}
                    </h3>
            
                    <p className="text-lg font-semibold text-[#A71010] ">
                      {/* <span className="text-lg mr-[8px] font-semibold text-gray-400 line-through ">
                      $33.69
                    </span> */}
                      <span>${item.price}</span>
                    </p>
                  </div>
                </div>
              </div>
              </Link>
            ))}
            </section>
    </div>
  )
}

export default PrdHome