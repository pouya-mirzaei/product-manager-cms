import React, { useEffect, useState } from 'react';
import { Button, Flex, Space, Table, Tag, Image, Typography, Modal } from 'antd';
import NewProductForm from './NewProductForm';
const Price = ({ price }) => (
  <Typography.Text type="secondary" strong>
    ${price}
  </Typography.Text>
);

const ProductsTable = ({ pending, data, onUpdate }) => {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
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
      dataIndex: 'title',
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
      dataIndex: 'count',
      align: 'center',
      render: (count) => {
        let color = count > 20 ? 'success' : count > 10 ? 'processing' : count > 5 ? 'warning' : 'error';
        return (
          <Tag color={color} bordered>
            {' '}
            {count}
          </Tag>
        );
      },
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Action',
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
    const allDetails = Object.entries(data).map(([key, value]) => ({
      key, // Use key for proper table rendering
      title: key,
      value,
    }));

    Modal.info({
      title: `${data.name}'s details`,
      content: (
        <>
          <div className="flex items-center mt-10"></div>
          <Table
            dataSource={allDetails}
            columns={[
              { title: 'Detail', dataIndex: 'title' },
              { title: 'Value', dataIndex: 'value' },
            ]}
            pagination={false}
          />
        </>
      ),
      maskClosable: true,
      width: 500,
      centered: true,
    });
  };

  const handleDelete = (data) => {
    Modal.confirm({
      title: `Deleting product from the database`,
      content: (
        <>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex items-center mt-10">
            <div className="basis-1/4">
              <img
                src={data.img}
                alt={data.title}
                className=" w-16 h-auto rounded-full items-center justify-center  border-2 border-gray-300"
              />
            </div>
            <div className="h-max float-start">{data.title}</div>
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
    Modal.confirm({
      title: `${data.name}'s details`,
      content: (
        <>
          <NewProductForm editing data={data} onEdit={(data) => edit(data)} />
        </>
      ),
      maskClosable: true,
      width: 1200,
      centered: true,
      destroyOnClose: true,
      footer: () => <></>,
    });
  };

  // ------------------------------------------------------------------

  // Operations :

  const deleteItem = (item) => {
    console.log(item);
    onUpdate();
  };

  const edit = (data) => {
    Modal.destroyAll();
    console.log(data);
    onUpdate();
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered // Add border for visual separation
      pagination={{ defaultPageSize: 5 }} // Enable pagination for larger datasets
      className="mt-10"
      loading={pending}
    />
  );
};
export default ProductsTable;
