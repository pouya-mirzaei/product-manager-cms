import { Button, Flex, Modal, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import useNotification from '../hooks/useNotification';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const toast = useNotification();

  useEffect(() => {
    fetch('http://localhost:3000/api/comments')
      .then((res) => res.json())
      .then((res) => {
        res.map((p) => (p.key = p.id));

        setComments(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: 'User',
      dataIndex: 'userID',
      align: 'center',
    },
    {
      title: 'Product',
      dataIndex: 'productID',
      align: 'center',
    },
    {
      title: 'Comment Message',
      dataIndex: 'body',
      width: 175,
      render: (msg, data) => (
        <Button
          type="primary"
          ghost
          onClick={() => {
            Modal.info({
              title: `Comment #${data.id} on products '${data.productID}' : `,
              content: (
                <>
                  <div>{msg}</div>
                </>
              ),
              maskClosable: true,
              width: 500,
              centered: true,
            });
          }}
        >
          Show comment
        </Button>
      ),
      align: 'center',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: 'Hour',
      dataIndex: 'hour',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'isAccept',
      sorter: (a, b) => (a.isAccept ? 1 : 0) - (b.isAccept ? 1 : 0),
      render: (status) => {
        let color = status ? 'success' : 'processing';
        return (
          <Tag color={color} bordered>
            {status ? 'Accepted' : 'Pending'}
          </Tag>
        );
      },
      align: 'center',
    },
    {
      title: 'action',
      width: 350,
      render: (_, data) => (
        <>
          <Flex justify="space-between" align="center">
            <Button onClick={() => handleDelete(data)} type="primary" danger>
              Delete
            </Button>
            <Button onClick={() => handleEdit(data)} type="dashed" danger>
              Edit
            </Button>
            <Button onClick={() => handleAnswer(data)} type="primary" ghost>
              Answer
            </Button>
            <Button onClick={() => handleAcceptComment(data)} type="primary">
              Accept
            </Button>
          </Flex>
        </>
      ),
    },
  ];

  return (
    <>
      <h1></h1>
      <Table columns={columns} dataSource={comments} bordered />
    </>
  );
}
