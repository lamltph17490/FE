import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../component/Comment";
import { ProductColor, ProductSize, Tprd } from "../../models/prd";
import { getProducts } from "../../redux/prdSlice";
import { RootState } from "../../redux/store";
import { Button, Col, Divider, Form, Image, InputNumber, Row, Select, Space, Typography } from "antd";
import { thousandFormat } from "../../untils";

type Props = {
  product: Tprd;
}

const ProductDetail = (product: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const products = useSelector((state: RootState) => state.prd.products);
  const dispatch = useDispatch<any>();
  const data = useMemo(() => products.find((item: any) => item._id === id), [id, products]);
  const [colorSelected, setColorSelected] = useState<ProductColor | null>(null);
  const sizes = useMemo<ProductSize[]>(() => colorSelected ? colorSelected.sizes : [], [colorSelected]);
  const [sizeSelected, setSizeSelected] = useState<ProductSize | null>(null);
  const [form] = Form.useForm();

  const onSelectColor = (color: ProductColor) => {
    setColorSelected(color);
    form.resetFields(["size", "quantity"]);
    setSizeSelected(null);
  };

  const onSelectSize = (size: ProductSize | null) => {
    if (size) {
      setSizeSelected(size);
    } else {
      setSizeSelected(null);
    }
    form.resetFields(["quantity"]);
  };

  useEffect(() => {
    if (data && data.colors.length > 0) {
      setColorSelected(data.colors[0]);
    }
  }, [data]);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <Row gutter={32}>
            <Col span={12}>
              <Image preview={false} alt="ecommerce" src={data.image} />
            </Col>
            <Col span={12}>
              {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
              <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: data.desc || '' }}/>
              <Form form={form} labelAlign="left" labelCol={{ span: 3 }} style={{ marginBottom: 30 }}>
                <Form.Item name="color" label="Màu sắc" rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}>
                  <Space>
                    {data.colors.map((color, index) => (
                      <Button value={color.colorName} onClick={() => {
                        onSelectColor(color);
                      }} danger={color.colorName === colorSelected?.colorName}
                              key={`color-${index}`}>{color.colorName}</Button>
                    ))}
                  </Space>
                </Form.Item>
                <Form.Item name="size" label="Kích cỡ" rules={[{ required: true, message: "Vui lòng chọn kích cỡ" }]}>
                  <Space>
                    {sizes.map((size: ProductSize) => (
                      <Button onClick={() => {
                        onSelectSize(size);
                      }} key={`size-${size.sizeName}`} value={size.sizeName} disabled={size.amount === 0}
                              danger={size.sizeName === sizeSelected?.sizeName}>{size.sizeName}</Button>
                    ))}
                  </Space>
                </Form.Item>
                <Form.Item label="Số lượng" name="quantity"
                           rules={[{ required: true, message: "Vui lòng chọn số lượng" }]}
                           help={`${sizeSelected ? sizeSelected.amount : data.colors.map(i => i.sizes.reduce((a, b) => a + b.amount, 0)).reduce((a, b) => a + b, 0)} sản phẩm có sẵn`}>
                  <InputNumber defaultValue={1} min={1} max={sizeSelected ? sizeSelected.amount : undefined} />
                </Form.Item>
              </Form>
              <Divider />
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{thousandFormat(data.price ? +data.price : 0)} VND</span>
                <Button size="large" htmlType="submit" type="primary"
                        className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        danger disabled={!colorSelected || !sizeSelected}>Thêm vào giỏ</Button>
                <button
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <div className="container px-5 py-12 mx-auto">
        <Comment product={data} />
      </div>
    </div>
  );
};

export default ProductDetail;
