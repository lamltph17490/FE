import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../../redux/store";
import { deleteCmt, getCmt } from "../../../redux/cmtSlice";
import { Tcmt } from "../../../models/cmt";

type Props = {};
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const CommentList = (props: Props) => {
    const comments = useSelector((state: RootState) => state.cmt.comments);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getCmt());
    }, [dispatch]);

    const handleRemove = (id: any) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa không?",
            text: "Không thể hoàn tác sau khi xóa",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng chắc chắn rồi",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteCmt(id)).unwrap();
                Swal.fire("Thành công!", "Xóa thành công.", "success");
            }
        });
    };

    const columns: ColumnsType<Tcmt> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Người bình luận',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product',
            key: 'product',

        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },

        {
            title: 'Hành động',
            key: 'action',
            render: item => (

                <>
                    <div className="grid-cols-3">                       
                        <button
                            onClick={() => handleRemove(item.action._id)}
                            className="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                        >
                            Xoá
                        </button>
                    </div>
                </>
            ),
        },
    ];

    const data: any = comments?.map((item, index) => {
        return {
            stt: index,
            content: item.content,
            user: item.user.name,
            product: item.product.name,
            action: item
        }
    })
    return (
        <Table columns={columns} dataSource={data} />

    );
};

export default CommentList;
