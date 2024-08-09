import React, { useEffect, useState } from 'react';
import HeaderTitle from '../Components/HeaderTitle';
import { Button, Flex, Modal, Table, Tag } from 'antd';
import useNotification from '../hooks/useNotification';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const toast = useNotification();
  const columns = [
    {
      title: 'User Info',
      children: [
        { title: 'First Name', dataIndex: 'firsname', align: 'center' },
        { title: 'Last Name', dataIndex: 'lastname', align: 'center' },
      ],
    },
    {
      title: 'Username',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'deleted',
      align: 'center',
      render: (deleted) => {
        let color = !deleted ? 'success' : 'error';
        return (
          <Tag color={color} bordered>
            {deleted ? 'deleted' : 'active'}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      width: 250,
      render: (_, data) => (
        <>
          <Flex justify="space-evenly" align="center">
            {!data.deleted ? (
              <>
                <Button onClick={() => handleDelete(data)} type="primary" danger>
                  Delete
                </Button>
                <Button onClick={() => handleDetails(data)} type="primary" ghost>
                  Details
                </Button>
                <Button onClick={() => handleEdit(data)} type="primary" ghost>
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleRestore(data)} type="primary" danger>
                  Restore User
                </Button>
              </>
            )}
          </Flex>
        </>
      ),
    },
  ];

  const handleDelete = (data, restore = false) => {
    Modal.confirm({
      title: `${restore ? 'Restoring' : 'Deleting'} user from the database`,
      content: (
        <>
          <p className="my-5">Are you sure you want to {restore ? 'restore' : 'delete'} this user?</p>
          <Table columns={[columns[0], columns[1], columns[4]]} dataSource={[data]} pagination={false} />
        </>
      ),
      maskClosable: true,
      width: 800,
      centered: true,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => deleteItem(data.id, restore),
    });
  };

  const handleRestore = (data) => handleDelete(data, true);

  const handleDetails = (data) => {};
  const handleEdit = (data) => {};

  // Operations : ------------------------------------------

  const deleteItem = (id, restore) => {
    fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((res) => {
        let msg = 'The user was deleted successfully';
        if (restore) msg = 'The user was restored successfully';

        if (res.affectedRows) toast.createNotification('success', msg);
        else toast.createNotification('error', 'There was no such a user to delete');
        updateTable();
      })
      .catch((err) => {
        toast.createNotification('error', 'Failed to connect to the server', err.message);
      });
  };

  const updateTable = () => {
    setPending(true);
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
        res.map((p) => (p.key = p.id));

        setPending(false);
      });
  };

  useEffect(() => {
    updateTable();
  }, []);

  return (
    <section>
      <HeaderTitle msg="The list of users" />

      <Table bordered dataSource={users} columns={columns} loading={pending} />
    </section>
  );
}
