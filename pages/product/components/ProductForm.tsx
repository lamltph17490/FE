import React, { ReactElement } from "react";
import { Button, Col, Divider, Form, FormInstance, Input, InputNumber, Row, Select, Space, Typography } from "antd";
import { findStringDuplicates, parserThousandFormat, thousandFormat } from "../../../untils";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { TprdCate } from "../../../models/prdCate";
import { Tprd } from "../../../models/prd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
interface ProductFormProps {
  data?: Tprd | null;
  form: FormInstance;
  onSubmit(values: any): Promise<void>;
  categories: TprdCate[];
  preview: string | undefined
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ProductForm(props: ProductFormProps): ReactElement {
  const { form, onSubmit, categories, preview, setPreview, data } = props;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
      <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Vui lòng không để trống" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Giá" name="price" rules={[{ required: true, message: "Vui lòng không để trống" }]}>
        <InputNumber style={{ width: "auto", minWidth: 200 }} formatter={value => (value ? thousandFormat(+value) : "")}
                     parser={value => value ? parserThousandFormat(value) : 0} controls={false} addonAfter="VND" />
      </Form.Item>
      <Form.Item label="Mô tả" name="desc" rules={[{ required: true, message: "Vui lòng không để trống" }]}>
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={data?.desc}
          onChange={(value) => {
            form.setFieldsValue({ desc: value })
          }}
        />
      </Form.Item>
      <Form.Item label="Danh mục sản phẩm" name="categoryId" rules={[{ required: true }]}>
        <Select options={categories.map((item) => ({ label: item.name, value: item._id }))} />
      </Form.Item>
      <div className="col-span-3">
        <label className="block text-sm font-medium text-gray-700">Xem trước ảnh</label>
        <div className="mt-1 w-40 h-40 relative">
          <picture>
            <img
              src={preview || "https://drums71.ru/wp-content/uploads/2018/02/no-img.jpg"}
              alt="Preview Image"
              className="h-40 w-40 rounded-full object-cover"
            />
          </picture>
        </div>
      </div>
      <div style={{ margin: '32px 0' }} className="col-span-6">
        <label className="block text-sm font-medium text-gray-700">Ảnh bài viết</label>
        <div
          className="w-full mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="form__add-user-avatar"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <Form.Item name="image" rules={[{ required: true, message: "Vui lòng chọn ảnh" }]} />
                <input
                  id="form__add-user-avatar"
                  onChange={(e) => {
                    console.log('files', e.target.files);
                    const fileSelected = e.target.files ? e.target.files[0] : null;
                    if (fileSelected) {
                      console.log('fileSelected', fileSelected);
                      setPreview(URL.createObjectURL(fileSelected));
                      form.setFieldsValue({ image: [fileSelected]});
                    }
                  }}
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      <Typography.Text strong>Mẫu mã sản phẩm</Typography.Text>
      <Form.List rules={[{ validator: async (rule, value) => {
          if (value.length === 0) {
            return Promise.reject('Vui lòng thêm mẫu mã sản phẩm')
          }
          const duplicates = findStringDuplicates(value.filter((i: any) => i.colorName?.trim()).map((i: any) => i.colorName.toLowerCase()))
          if (duplicates.length > 0) {
            return Promise.reject('Màu đã bị trùng')
          }
          return Promise.resolve()
        }}]} name="colors" initialValue={[{ colorName: '', sizes: [{ sizeName: '', amount: 0}]}]}>
        {(colors, { add: addColor, remove: removeColor }, { errors }) => (
          <div style={{ marginBottom: 5}}>
            {colors.map((color) => (
              <div key={`color-${color.name}`}>
                <Row gutter={16}>
                  <Col span={11}>
                    <Form.Item name={[color.name, "colorName"]} fieldKey={[color.name, 'colorName']} rules={[{ required: true, message: 'Vui lòng nhập màu sắc'}]}>
                      <Input placeholder="Màu sắc" />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.List name={[color.name, 'sizes']} rules={[{ validator: async (rule, value) => {
                        const duplicates = findStringDuplicates(value.filter((i: any) => i.sizeName?.trim()).map((i: any) => i.sizeName.toLowerCase()))
                        if (duplicates.length > 0) {
                          return Promise.reject('Size đã bị trùng')
                        }
                        return Promise.resolve()
                      }}]}>
                      {(sizes, { add: addSize, remove: removeSize }, { errors: sizeErrors }) => (
                        <div>
                          {sizes.map((size) => (
                            <Space key={`size-${color.name}-${size.name}`} align="start">
                              <Form.Item name={[size.name, "sizeName"]} rules={[{ required: true, message: 'Vui lòng nhập size' }]}>
                                <Input placeholder="Size" />
                              </Form.Item>
                              <Form.Item name={[size.name, "amount"]} rules={[{ required: true, message: 'Vui lòng nhập số lượng'}]}>
                                <InputNumber min={0} placeholder="Số lượng" />
                              </Form.Item>
                              {size.name > 0 ? (
                                <Button type="dashed" onClick={() => {
                                  removeSize(size.name);
                                }} icon={<CloseOutlined />} />
                              ) : (
                                <Button onClick={() => {
                                  addSize({ sizeName: "", amount: 0 });
                                }} icon={<PlusOutlined />} />
                              )}
                            </Space>
                          ))}
                          <Form.ErrorList errors={sizeErrors} />
                        </div>
                      )}
                    </Form.List>
                  </Col>
                  <Col span={2}>
                    <Button style={{ borderRadius: '50%'}} danger onClick={() => {
                      removeColor(color.name);
                    }} icon={<CloseOutlined />} disabled={color.name === 0} />
                  </Col>
                </Row>
                <Divider />
              </div>
            ))}
            <Form.ErrorList errors={errors} />
            <Button type="default" onClick={() => { addColor({ sizes: [{ sizeName: '', amount: 0}]}) }}>+ màu</Button>
          </div>
        )}
      </Form.List>
    </Form>
  )
}
