import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { AccountBookTwoTone, DollarTwoTone, EditTwoTone, FileImageTwoTone } from '@ant-design/icons';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 16,
  },
};
const NewProductForm = ({
  editing = false,
  data = { title: '', price: '', count: '', img: '', popularity: '', sale: '' },
  onEdit,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log(values);
    if (editing) {
      // console.log('editing');
      onEdit(values);
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name={editing ? 'add-new-product' : 'edit-product'}
      onFinish={onFinish}
      style={{
        maxWidth: 1200,
      }}
      scrollToFirstError={true}
      initialValues={{
        name: data.title,
        price: data.price,
        quantity: data.count,
        imageUrl: data.img,
        rating: data.popularity,
        salesCount: data.sale,
      }}
    >
      <Row>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            hasFeedback
            validateStatus="validating"
            rules={[
              {
                required: true,
                message: 'Enter the name of the product',
              },
            ]}
          >
            <Input prefix={<EditTwoTone />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Price"
            validateStatus="warning"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Enter the price of the product',
              },
            ]}
          >
            <Input prefix={<DollarTwoTone />} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="quantity"
            label="Quantity"
            validateStatus="error"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Enter the quantity of the product',
              },
            ]}
          >
            <Input prefix={<AccountBookTwoTone />} type="number" max={1000000} min={0} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="imageUrl"
            label="Image url"
            validateStatus="success"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Enter the Image url of the product',
              },
            ]}
          >
            <Input prefix={<FileImageTwoTone />} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="rating"
            label="Rating"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Enter the Product rating of the product',
              },
            ]}
            help={'On scale 0-100'}
          >
            <Input prefix={<FileImageTwoTone />} max={100} min={0} type="number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="salesCount"
            label="Sales count"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Enter the Sales count of the product',
              },
            ]}
          >
            <Input prefix={<FileImageTwoTone />} type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailLayout} style={{ marginTop: 10 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            {!editing ? 'Add ' : 'Submit changes'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default NewProductForm;
