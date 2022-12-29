import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../../redux/store";
import { Tblog } from "../../../models/blogs";

import { deleteVouche, getVouches } from "../../../redux/voucheSlice";

type Props = {};
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const PrdSizeList = (props: Props) => {
    const vouche = useSelector((state: RootState) => state.vouche.vouches);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getVouches());
    }, [dispatch]);
    console.log(vouche);      

    const handleRemove = (id: any) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa không?",
            text: "Không thể hoàn tác sau khi xóa",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng chắc chắn rồi!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteVouche(id)).unwrap();
                Swal.fire("Thành công!", "Xóa thành công.", "success");
            }
        });
    };
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
    const columns: ColumnsType<Tblog> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Mã',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },             
        {
            title: 'Ngày hết hạn' ,
            dataIndex: 'time',
            key: 'time',
            render: text => <a>{text}</a>,
        },
        {
          title: 'Số Lượng',
          dataIndex: 'amount',
          key: 'amount',
          render: text => <a>{text}</a>,
      },
      {
        title: 'Giảm giá(%)',
        dataIndex: 'percent',
        key: 'percent',
        render: text => <a>{text}</a>,
    },
        {
            title: 'Hành Động',
            key: 'action',
            render: item => (

                <><Link href={`/admin/vouches/${item.action._id}/edit`}>
                    <a className="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sửa
                </a>
                </Link>                             
                <button
                    onClick={() => handleRemove(item.action._id)}
                    className="h-8 inline-flex items-center px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                >
                    Xóa
                </button></>
            ),
        },
    ];

    const data: any = vouche?.map((item, index) => {
        return {
            stt: index,
            title: item.code,
            time: item.time,
            amount: item.amount,
            percent: item.percent,
            action: item
        }
    })
    return (
        <Table columns={columns} dataSource={data} />
    );
};

export default PrdSizeList;
