import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React, { useEffect, useMemo } from "react";
import { getAll, getBySlug } from "../../Api/blogApi";
import { Tblog } from "../../models/blogs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getBlogs } from "../../redux/blogSlice";

type Props = {
  blog: Tblog;
};

const Blog = ({ blog }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<any>();
  const data = useMemo(() => blogs.find((item: any) => item._id === id), [id, blogs]);
  // 
  const render = document.getElementById('content')
  if(render) {
    render.innerHTML = data.content
  }
  // 
  const renders = document.getElementById('title')
  if(renders) {
    renders.innerHTML = data.title
  }
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  if (!data) return <div>loading...</div>;
  return <div className="w-[1410px] mx-auto">
    <div className="text-4xl mb-[20px] mt-[30px]" id="title"></div>  
    <div className="mx-auto w-[1410px] text-lg" id="content">
    {/* {data.content} */}
    </div>
  </div>;
};


export default Blog;