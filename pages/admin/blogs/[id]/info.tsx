import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminLayout } from "../../../../layouts";
import { getBlog } from "../../../../redux/blogSlice";
import { RootState } from "../../../../redux/store";

type Props = {};

const InfoBlog = (props: Props) => {
  const { blog } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { id } = router.query;
  console.log(blog);
  const render = document.getElementById('content')
  if(render) {
    render.innerHTML = blog.content
  }
  useEffect(() => {
    dispatch(getBlog(id));
    
  }, [dispatch, id]);
  if (blog == "") return <div>Loading...</div>;
  return (
    <>
    <html lang="en">
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </Head>
    <body>
    <div id="content"></div>
    </body>
    </html>
    </>
  );
};

InfoBlog.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default InfoBlog;
