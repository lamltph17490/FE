import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../../component/Comment';
import { ProductColor, ProductSize, Tprd } from "../../models/prd";
import { getProducts } from '../../redux/prdSlice';
import { RootState } from '../../redux/store';
import { Button, Form, Select, Space, Typography } from "antd";

type Props = {
  product: Tprd;
}

const ProductDetail = (product: Props) => {
  const router = useRouter()
  const {id} = router.query
  const products = useSelector((state: RootState) => state.prd.products);
  const dispatch = useDispatch<any>();
  const data = useMemo(() => products.find((item:any)=>item._id === id), [id, products])
  const [colorSelected, setColorSelected] = useState<ProductColor | null>(null);
  const sizes = useMemo<ProductSize[]>(() => colorSelected ? colorSelected.sizes : [], [colorSelected])
  const [sizeSelected, setSizeSelected] = useState<ProductSize | null>(null);
  const [form] = Form.useForm()

  const onSelectColor = (color: ProductColor) => {
    setColorSelected(color);
    form.resetFields(['size']);
    setSizeSelected(null)
  }

  const onSelectSize = (sizeName: string) => {
    const find = sizes.find((size) => size.sizeName === sizeName);
    if (find) {
      setSizeSelected(find)
    } else {
      setSizeSelected(null)
    }
  }

  useEffect(() => {
    if (data && data.colors.length > 0) {
      setColorSelected(data.colors[0])
    }
  }, [data])
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  if(!data) return <div>loading...</div>
  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={data.image} />
            <Form form={form} className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2> */}
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
              <p className="leading-relaxed">{data.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <Form.Item name="color" label="Color">
                    <Button.Group>
                      {data.colors.map((color, index) => (
                        <Button onClick={() => { onSelectColor(color)}} type={color.colorName === colorSelected?.colorName ? 'primary' : 'default'} key={`color-${index}`}>{color.colorName}</Button>
                      ))}
                    </Button.Group>
                  </Form.Item>
                  {/*<button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>*/}
                  {/*<button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>*/}
                  {/*<button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>*/}
                </div>
                <div className="flex ml-6 items-center">
                  <div className="relative">
                    <Form.Item name="size" label="Size" rules={[{ required: true, message: 'Vui lòng chọn Size'}]}>
                      <Select onSelect={onSelectSize} style={{ width: "auto", minWidth: 100 }} options={sizes.map((size) => ({ label: size.sizeName, value: size.sizeName, disabled: size.amount === 0}))} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Space>
                <Typography.Text>Số lượng: </Typography.Text>
                <Typography.Text>{sizeSelected ? sizeSelected.amount : `Tổng: ${data.colors.map(i => i.sizes.reduce((a, b) => a + b.amount, 0)).reduce((a, b) => a + b, 0)}`}</Typography.Text>
              </Space>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                <Button size="large" htmlType="submit" type="primary" className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" danger>Add cart</Button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>
      <Comment product={data} />
    </div>
  )
}

export default ProductDetail
