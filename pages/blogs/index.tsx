import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { ReactElement, useEffect } from "react";

import { ClientLayout } from "../../layouts";
import { TblogCate } from "../../models/blogCates";
import { Tblog } from "../../models/blogs";
type Props = {
  posts: Tblog[];
  catePost: TblogCate[];
};

const index = ({ posts, catePost }: Props) => {
  return (
    <div className="container-base ">
      <Head>
        <title>Tin tức</title>
      </Head>
      <div className="w-full container mx-auto">
  <div className="flex flex-col items-center py-12">
    <a
      className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
      href="#"
    >
      Tin tức
    </a>
    <p className="text-lg text-gray-600">
      Cập nhật những tin tức mới nhất về thời trang
    </p>
  </div>
</div>

      <div className="container mx-auto flex flex-wrap py-6">
  {/* Posts Section */}
  <section className="w-full md:w-2/3 flex flex-col items-center px-3">
   {posts.map((item, index)=>(
     <article className="flex flex-col shadow my-4 w-[940px]" key={index}>
     {/* Article Image */}
     <a href="#" className="hover:opacity-75">
       <img className="object-cover object-center w-full h-64 lg:h-80
" src={item.thumbnail} />
     </a>
     <div className="bg-white flex flex-col justify-start p-6">
       <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">
         {item.categoryId.name}
       </a>
       <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4">
       {item.title}
       </a>
       
       {/* <a href="#" className="pb-6 w-96">
         {item.content}
       </a> */}
       <Link href={`/blogs/${item.slug}`}>
       <a className="uppercase text-gray-800 hover:text-black">
         Đọc tiếp<i className="fas fa-arrow-right" />
       </a>
       </Link>
     </div>
   </article>
   ))}
   
    {/* Pagination */}
    <div className="flex items-center py-8">
      <a
        href="#"
        className="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center"
      >
        1
      </a>
      <a
        href="#"
        className="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center"
      >
        2
      </a>
      <a
        href="#"
        className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3"
      >
        Next <i className="fas fa-arrow-right ml-2" />
      </a>
    </div>
  </section>
  {/* Sidebar Section */}
  <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
      <p className="text-xl font-semibold pb-5">About Us</p>
      <p className="pb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis
        est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac
        habitasse platea dictumst.
      </p>
      <a
        href="#"
        className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
      >
        Get to know us
      </a>
    </div>
    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
      <p className="text-xl font-semibold pb-5">Instagram</p>
      <div className="grid grid-cols-3 gap-3">
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=2"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=3"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=4"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=5"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=6"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=7"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=8"
        />
        <img
          className="hover:opacity-75"
          src="https://source.unsplash.com/collection/1346951/150x150?sig=9"
        />
      </div>
      <a
        href="#"
        className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6"
      >
        <i className="fab fa-instagram mr-2" /> Follow @whitecat
      </a>
    </div>
  </aside>
</div>

    </div>
    
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/api/news");
  const posts = await res.json();
  
  const req = await fetch("http://localhost:8000/api/categorynews");
  const catePost = await req.json();

  return {
    props: {
      posts,
      catePost,
    },
    revalidate: 60,
  };
};
index.getLayout = (page: ReactElement) => <ClientLayout>{page}</ClientLayout>;
export default index;
