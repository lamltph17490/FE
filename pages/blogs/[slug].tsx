import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import React from "react";
import { getAll, getBySlug } from "../../Api/blogApi";
import { Tblog } from "../../models/blogs";
import Head from "next/head";

type Props = {
  blog: Tblog;
};

const Blog = ({ blog }: Props) => {
  return <div>
    <Head>
      <title>
      {blog.title}
      </title>
    </Head>
    <div className="mx-auto w-[1410px]">
    {blog.content}
    </div>
  </div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAll();
  const paths = data?.map((blogs) => ({ params: { slug: blogs.slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug as string;
  const blog = await getBySlug(slug);

  return {
    props: { blog },
    revalidate: 6,
  };
};
export default Blog;
