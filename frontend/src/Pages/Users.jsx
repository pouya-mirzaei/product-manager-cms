import React, { useEffect, useState } from 'react';
import HeaderTitle from '../Components/HeaderTitle';
import { Button, Flex, Table } from 'antd';

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
    title: 'Actions',
    width: 250,
    render: (_, data) => (
      <>
        <Flex justify="space-between" align="center">
          <Button onClick={() => handleDelete(data)} type="primary" danger>
            Delete
          </Button>
          <Button onClick={() => handleAnswer(data)} type="primary" ghost>
            Details
          </Button>
          <Button onClick={() => handleEdit(data)} type="primary" ghost>
            Edit
          </Button>
        </Flex>
      </>
    ),
  },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
        console.log(res);
        res.map((p) => (p.key = p.id));

        setPending(false);
      });
  }, []);

  return (
    <section>
      <HeaderTitle msg="The list of users" />

      <Table bordered dataSource={users} columns={columns} loading={pending} />
    </section>
  );
}
