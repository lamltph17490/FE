import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TblogCate } from "../../models/blogCates";


type CateNewsProps = {
    cateNews: TblogCate[];
};

const Sidebar = ({ cateNews }: CateNewsProps) => {
    //   const cateNew = useSelector((state: RootState) => state.new.cateNews);
    return (
        <div className="">
            <aside className="md:w-1/3 items-center px-3">
                <h1 className="w-[400px] text-2xl ml-[80px]">Danh mục bài viết</h1>
                <nav className="w-full">
                    <ul className="space-y-[20px]">
                        {cateNews?.map((item, index) => (
                            <li className="w-[400px]" key={index}>
                                <Link href={`/cateNews/${item._id}`}><button className="text-lg hover:text-blue-500">{item.name}</button></Link>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </nav>

            </aside>


        </div>
    );
};

export default Sidebar;