import React from 'react';
import { Button, Flex, Space, Table, Tag, Image } from 'antd';

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    render: (link, data) => (
      <Image
        src={link}
        alt={data.name}
        width={50} // Adjust image width as needed
        height={50} // Adjust image height as needed
        style={{ borderRadius: '50%' }} // Add rounded corners
      />
    ),
    width: 100, // Adjust column width as needed
    align: 'center', // Center image content
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true, // Enable sorting
    ellipsis: true, // Enable text truncation with ellipsis
  },
  {
    title: 'Price',
    dataIndex: 'price',
    align: 'right', // Align price to the right
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    align: 'center', // Center quantity content
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_, data) => (
      <Flex justifyContent="space-between" alignItems="center">
        <Button type="primary">Details</Button>
        <Space size={8}>
          <Button danger type="primary">
            Delete
          </Button>
          <Button type="primary">Edit</Button>
        </Space>
      </Flex>
    ),
    width: 250, // Adjust column width as needed
  },
];

let data = [
  {
    key: '1',
    name: 'John Brown',
    price: 32.99, // Add decimals for better presentation
    quantity: 5,
    image: './public/img/oil.jpeg',
  },
  {
    key: '2',
    name: 'John Brown',
    price: 32.99, // Add decimals for better presentation
    quantity: 5,
    image: './public/img/oil.jpeg',
  },
  {
    key: '3',
    name: 'John Brown 5',
    price: 32.99, // Add decimals for better presentation
    quantity: 5,
    image: './public/img/oil.jpeg',
  },
  {
    key: '4',
    name: 'John Brown 4',
    price: 32.99, // Add decimals for better presentation
    quantity: 5,
    image: './public/img/oil.jpeg',
  },
];

const ProductsTable = () => (
  <Table
    columns={columns}
    dataSource={data}
    bordered // Add border for visual separation
    pagination={{ defaultPageSize: 5 }} // Enable pagination for larger datasets
    className="mt-10"
  />
);

export default ProductsTable;
