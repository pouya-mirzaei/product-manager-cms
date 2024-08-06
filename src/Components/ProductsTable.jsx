import React from 'react';
import { Button, Flex, Space, Table, Tag, Image, Typography, Modal } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
const Price = ({ price }) => (
  <Typography.Text type="secondary" strong>
    ${price}
  </Typography.Text>
);
let data = [
  {
    key: '1',
    name: 'John Brown',
    price: 10.99, // Add decimals for better presentation
    quantity: 11,
    image: './public/img/oil.jpeg',
  },
  {
    key: '2',
    name: 'mmd heidari',
    price: 100.99, // Add decimals for better presentation
    quantity: 5,
    image: './public/img/oil.jpeg',
  },
  {
    key: '3',
    name: 'pouya 006',
    price: 54.99, // Add decimals for better presentation
    quantity: 45,
    image: './public/img/oil.jpeg',
  },
  {
    key: '4',
    name: 'Aidin the god',
    price: 31.99, // Add decimals for better presentation
    quantity: 4,
    image: './public/img/oil.jpeg',
  },
  {
    key: '5',
    name: 'hashem the dark',
    price: 0, // Add decimals for better presentation
    quantity: 7,
    image: './public/img/oil.jpeg',
  },
];

const ProductsTable = () => {
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
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center', // Align price to the right,
      sorter: (a, b) => a.price - b.price,
      render: (price) => <Price price={price} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
      render: (count, data) => {
        let color = count > 20 ? 'success' : count > 10 ? 'processing' : count > 5 ? 'warning' : 'error';
        return (
          <Tag color={color} bordered>
            {' '}
            {data.quantity}
          </Tag>
        );
      },
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, data) => (
        <Flex justify="space-between" align="center">
          <Button onClick={() => handleDetails(data)} type="primary" color="green">
            Details
          </Button>
          <Button onClick={() => handleDelete(data)} danger type="primary">
            Delete
          </Button>
          <Button onClick={() => handleEdit(data)} type="primary">
            Edit
          </Button>
        </Flex>
      ),
      width: 250, // Adjust column width as needed
    },
  ];

  const handleDetails = (data) => {
    console.log(data.quantity);
  };
  const handleDelete = (data) => {
    Modal.confirm({
      title: `Deleting product from the database`,
      content: (
        <>
          <p>are you sure you want to delete this product?</p>
          <div className="flex items-center mt-10">
            <div className="basis-1/4">
              <img
                src={data.image}
                alt={data.name}
                className=" w-16 h-auto rounded-full items-center justify-center  border-2 border-gray-300"
              />
            </div>
            <div className="h-max float-start">{data.name}</div>
          </div>
        </>
      ),
      maskClosable: true,
      width: 500,
      centered: true,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => deleteItem(data),
    });
  };
  const handleEdit = (data) => {
    console.log(data.quantity);
  };

  // ------------------------------------------------------------------

  // Operations :

  const deleteItem = (item) => {
    console.log(item);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered // Add border for visual separation
      pagination={{ defaultPageSize: 5 }} // Enable pagination for larger datasets
      className="mt-10"
    />
  );
};
export default ProductsTable;
