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
                <div className="w-[400px] mt-[40px]">
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
                        <i className="fab fa-instagram mr-2" /> Theo dõi @whitecat
                    </a>
                </div>
            </aside>


        </div>
    );
};

export default Sidebar;