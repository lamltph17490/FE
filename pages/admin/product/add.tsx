import Head from "next/head";
import Link from "next/link";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminLayout } from "../../../layouts";
import { NextPageWithLayout } from "../../../models/layout";
import { RootState } from "../../../redux/store";
import { uploadImage } from "../../../untils";
import dynamic from "next/dynamic";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { getprdCates } from "../../../redux/prdCateSlice";
import { addProduct } from "../../../redux/prdSlice";
import ProductForm from "../../product/components/ProductForm";
import { Button, Form } from "antd";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
type Props = {};

type Inputs = {
  name: string;
  price: number;
  desc: string;
  categoryId: string;
  image: {
    0: File;
  };
};

const AddPrd: NextPageWithLayout = (props: Props) => {
  const [preview, setPreview] = useState<string>();
  const prdCate = useSelector((state: RootState) => state.prdCate.prdCates);
  const dispatch = useDispatch<any>();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm()

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    dispatch(getprdCates());
  }, [dispatch]);

  const onSubmit = async (values: Inputs) => {
    try {
      const { data } = await uploadImage(values.image[0]);
      values.image = data.url;
      const res = await dispatch(addProduct({ ...values, subImage: fileList })).unwrap();
      toast.success("Thêm bài viết thành công");
      console.log(res);
      form.resetFields();
      setPreview("");
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <Head>
        <title>Thêm Sản Phẩm</title>
      </Head>
      <header className="z-10 fixed top-0 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5 className="relative mb-0 pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Sản Phẩm
          </h5>
          <span>Thêm Sản Phẩm</span>
        </div>
        <Link href="/admin/product">
          <button
            type="button"
            className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            DS sản phẩm
          </button>
        </Link>
      </header>

      <div className="p-6 mt-24 overflow-hidden">
        <div>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <span className="font-semibold mb-4 block text-xl">Thêm sản phẩm mới</span>
              <ProductForm form={form} onSubmit={onSubmit} categories={prdCate} preview={preview} setPreview={setPreview} />
            </div>
            <h3>Sub Imgae</h3>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button
                type="primary"
                onClick={form.submit}
                htmlType="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AddPrd.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AddPrd;
