import Head from "next/head";
import Link from "next/link";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminLayout } from "../../../../layouts";
import { NextPageWithLayout } from "../../../../models/layout";
import { RootState } from "../../../../redux/store";
import { findStringDuplicates, parserThousandFormat, thousandFormat, uploadImage } from "../../../../untils";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getprdCates } from "../../../../redux/prdCateSlice";
import { getProduct, updateProduct } from "../../../../redux/prdSlice";
import { Col, Divider, Row, Typography, Form, Input, Button, InputNumber, Select, Space } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import ProductForm from "../../../product/components/ProductForm";

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

const AddBlog: NextPageWithLayout = (props: Props) => {
  const [preview, setPreview] = useState<string>();
  const prdCate = useSelector((state: RootState) => state.prdCate.prdCates);
  const dispatch = useDispatch<any>();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [product, setProduct] = useState<any>(null);
  const modules = {
    toolbar: [
      [{ "header": [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image",
  ];


  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getprdCates());

    (async () => {
      try {
        if (id) {
          const user = await dispatch(getProduct(id)).unwrap();
          setProduct(user);
          setContent(user.content);
          form.setFieldsValue(user);
          setPreview(user.image);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, id, form]);
  const onSubmit = async (values: Inputs) => {
    try {
      console.log('values', values);
      if (typeof values.image === "object") {
        const { data } = await uploadImage(values.image[0]);
        values.image = data.url;
      }
      await dispatch(updateProduct({ ...values, _id: id })).unwrap();
      toast.success("Cập nhật  thành công");
      router.push("/admin/product");
      console.log(content);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Sửa Sản Phẩm</title>
      </Head>
      <header
        className="z-10 fixed top-0 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <h5
            className="relative mb-0 pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
            Sản Phẩm
          </h5>
          <span>Sửa Sản Phẩm</span>
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
        <Row>
          <Col lg={{ span: 24 }} className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <span className="font-semibold mb-4 block text-xl">Sửa sản phẩm</span>
              <ProductForm data={product} form={form} onSubmit={onSubmit} categories={prdCate} preview={preview} setPreview={setPreview} />
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button
                type="primary"
                onClick={form.submit}
                htmlType="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sửa sản phẩm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

AddBlog.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AddBlog;
