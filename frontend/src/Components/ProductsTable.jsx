import React, { useEffect, useState } from 'react';
import { Button, Flex, Space, Table, Tag, Image, Typography, Modal } from 'antd';
import NewProductForm from './NewProductForm';
import useNotification from '../hooks/useNotification';
import HeaderTitle from './HeaderTitle';
const Price = ({ price }) => {
  return (
    <Typography.Text type="secondary" strong>
      ${formatNumber(price)}
    </Typography.Text>
  );
};

const formatNumber = (num) => new Intl.NumberFormat('en-us').format(num);

const ProductsTable = ({ pending, data, updateTable }) => {
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
      sorter: (a, b) => a.title.localeCompare(b.title),
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
        let color = count > 100 ? 'success' : count > 20 ? 'processing' : count > 5 ? 'warning' : 'error';
        return (
          <Tag color={color} bordered>
            {formatNumber(count)}
          </Tag>
        );
      },
      sorter: (a, b) => a.count - b.count,
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

    allDetails.map((item) => {
      if (Number.isInteger(item.value)) item.value = formatNumber(item.value);
    });

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
              <Image src={data.img} alt={data.name} width={50} height={50} style={{ borderRadius: '50%' }} />
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
          <NewProductForm editing data={data} onEdit={(inputData) => edit(inputData, data.id)} />
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
  const toast = useNotification();

  const deleteItem = (item) => {
    fetch(`http://localhost:3000/api/products/${item.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        updateTable();
        toast.createNotification('success', 'The product deleted successfully');
      })
      .catch((err) => {
        toast.createNotification('error', 'Failed to delete', err.message);
      });
  };

  const edit = (
    { name: title, price, quantity: count, imageUrl: img, rating: popularity, salesCount: sale, colors, description, slag },
    id
  ) => {
    let newData = { title, price, count, img, popularity, sale, colors, description, slag };

    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },

      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.createNotification('success', 'The product updated successfully', 'Hellllll yeahhhh');
        Modal.destroyAll();
        updateTable();
      })
      .catch((err) => {
        toast.createNotification('error', 'Ahh damn this errors : ', err.message);
      });
  };

  return (
    <>
      <HeaderTitle msg={'List of the available products'} />

      <Table
        columns={columns}
        dataSource={data}
        bordered // Add border for visual separation
        pagination={{ defaultPageSize: 5 }} // Enable pagination for larger datasets
        className="mt-10"
        loading={pending}
      />
    </>
  );
};
export default ProductsTable;
