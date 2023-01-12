import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import Link from "next/link";
import { get, getAll } from "../../Api/blogCateApi";
import Sidebar from "../blogs/Sidebar";
import News from "../blogs/News";
import { TblogCate } from "../../models/blogCates";
import Head from "next/head";

type Props = {
  cateNews: TblogCate;
  catePost: TblogCate[];
};

const CateNews = ({ cateNews, catePost }: Props) => {
  const news = cateNews.news;
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
        <News postsNews={news} catePost={[]}></News>
        <Sidebar cateNews={catePost}></Sidebar>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAll();
  const pathsnews = data.map((cateNews) => ({ params: { id: cateNews._id } }));
  return {
    paths: pathsnews,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;
  const cateNews = await get(id);

  const req = await fetch("http://localhost:8000/api/CategoryNews");
  const catePost = await req.json();

  return {
    props: {
      cateNews,
      catePost,
    },
    revalidate: 60,
  };
};

export default CateNews;