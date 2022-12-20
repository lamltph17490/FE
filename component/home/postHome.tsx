import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tblog } from '../../models/blogs';
import { getBlogs } from '../../redux/blogSlice';
import { RootState } from '../../redux/store';

type Props = {
  posts: Tblog[];
}

const PostHome = (props: Props) => {
  const posts = useSelector((state: RootState) => state.blog.blogs);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {posts?.slice(0, 3)?.map((item, index) => (
        <div key={index}>
          <picture>
            <img
              className="object-cover object-center w-full h-64 lg:h-80"
              src={item.thumbnail}
              alt=""
            />
          </picture>
          <div className="mt-8 text-center">
            <span className="text-xs uppercase tracking-widest">{item.categoryId.name}</span>
            <h1 className="mt-4 text-2xl font-normal text-gray-800 capitalize dark:text-white">
              {item.title}
            </h1>
            <div className="text-center mt-4">
              <Link href={`/blogs/${item._id}`}>
                <a href="#" className="inline-block text-black underline ">
                  Đọc Tiếp
                </a>
              </Link>

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostHome