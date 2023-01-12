import React from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import News from "./News";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Tblog } from "../../models/blogs";
import { TblogCate } from "../../models/blogCates";
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
        <div className="flex flex-col items-center mt-[20px]">
          <a
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-4xl"
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
        <News postsNews={posts} catePost={[]}></News>
        <Sidebar cateNews={catePost}></Sidebar>
      </div>
    </div>
    
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/api/news");
  const posts = await res.json();

  const req = await fetch("http://localhost:8000/api/CategoryNews");
  const catePost = await req.json();

  return {
    props: {
      posts,
      catePost,
    },
    revalidate: 60,
  };
};

export default index;