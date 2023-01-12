import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tblog } from "../../models/blogs";
import Head from "next/head";
import { formatDate } from "../../untils";
import { TblogCate } from "../../models/blogCates";

type NewsProps = {
    postsNews: Tblog[];
    catePost: TblogCate[];
};

const News = ({ postsNews, catePost }: NewsProps) => {
    const imagePerRow = 3;
    const [next, setNext] = useState(imagePerRow);
    const handleMoreImage = () => {
        setNext(next + imagePerRow);
    }
    return (
        <>
            {/* Posts Section */}
            <section className="w-full md:w-2/3 flex flex-col items-center px-3">
                {postsNews?.slice(0, next)?.map((item, index) => (
                    <article className="flex flex-col shadow my-4 w-[940px]" key={index}>
                        {/* Article Image */}
                        <a href="#" className="hover:opacity-75">
                            <picture>
                                <img className="object-cover object-center w-full h-64 lg:h-80" src={item.thumbnail} />
                            </picture>
                        </a>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">
                                {item.categoryId.name}
                            </a>
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
                                {item.title}
                            </a>
                            <p>{formatDate(item.createdAt!)}</p>
                            <Link href={`/blogs/${item._id}`}>
                                <a className="uppercase text-gray-800 hover:text-black">
                                    Đọc tiếp<i className="fas fa-arrow-right" />
                                </a>
                            </Link>
                        </div>
                    </article>
                ))}
                {next < postsNews?.length && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]" onClick={handleMoreImage}>
                        Xem thêm
                    </button>
                )}
                
            </section>


        </>
    );
};

export default News;