import { Button, Flex, Form, Input, Modal, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import useNotification from '../hooks/useNotification';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [pending, setPending] = useState(true);
  const toast = useNotification();

  const [form] = Form.useForm();

  const updateTable = () => {
    fetch('http://localhost:3000/api/comments')
      .then((res) => res.json())
      .then((res) => {
        res.map((p) => (p.key = p.id));

        setComments(res);
        setPending(false);
      })
      .catch((err) => {
        toast.createNotification('error', 'Failed to connect to the server', err.message);
      });
  };

  useEffect(() => {
    updateTable();
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
            <Button onClick={() => handleEdit(data)} type="primary" ghost>
              Edit
            </Button>
            <Button onClick={() => handleAnswer(data)} type="primary" ghost>
              Answer
            </Button>
            <Button onClick={() => handleAcceptComment(data)} type="primary" danger={data.isAccept} ghost={data.isAccept}>
              {!data.isAccept ? 'Accept' : 'Reject'}
            </Button>
          </Flex>
        </>
      ),
    },
  ];

  const handleDelete = (data) => {
    Modal.confirm({
      title: `Deleting comment from the database`,
      content: (
        <>
          <p className="my-5">Are you sure you want to delete this comment?</p>
          <Table
            columns={[
              { title: 'User', dataIndex: 'userID' },
              { title: 'Product', dataIndex: 'productID' },
              { title: 'Comment Message', dataIndex: 'body', width: 600 },
            ]}
            dataSource={[data]}
            pagination={false}
          />
        </>
      ),
      maskClosable: true,
      width: 800,
      centered: true,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => deleteItem(data),
    });
  };

  const handleEdit = (data) => {
    form.setFieldValue('commentMsg', data.body);
    Modal.confirm({
      title: `${data.productID}'s comment message`,
      content: (
        <>
          <Form form={form}>
            <Form.Item name="commentMsg">
              <Input.TextArea autoSize={{ minRows: 3 }} />
            </Form.Item>
          </Form>
        </>
      ),
      maskClosable: true,
      width: 500,
      centered: true,
      destroyOnClose: true,
      onOk: () => editComment(data.id),
    });
  };

  const handleAnswer = () => {};
  const handleAcceptComment = (data) => {
    Modal.confirm({
      title: `Are you sure you want to ${data.isAccept ? 'reject' : 'accept'} this comment ?`,
      content: (
        <>
          <Table
            columns={[
              { title: 'User', dataIndex: 'userID' },
              { title: 'Product', dataIndex: 'productID' },
              { title: 'Comment Message', dataIndex: 'body', width: 600 },
            ]}
            dataSource={[data]}
            pagination={false}
          />
        </>
      ),
      maskClosable: true,
      width: 800,
      centered: true,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => toggleCommentVerification(data),
    });
  };

  // Operation --------------------------------------------------------------------

  const deleteItem = (data) => {
    fetch(`http://localhost:3000/api/comments/${data.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        Modal.destroyAll();
        if (res.affectedRows) toast.createNotification('success', 'The comment deleted successfully');
        else toast.createNotification('error', 'There was no such a product to delete');
        updateTable();
      })
      .catch((err) => {
        toast.createNotification('error', 'Failed to connect to the server', err.message);
      });
  };

  const editComment = (id) => {
    let comment = form.getFieldValue('commentMsg');
    console.log(comment);

    fetch(`http://localhost:3000/api/comments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ body: comment }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.affectedRows) toast.createNotification('success', 'The comment deleted successfully');
        else toast.createNotification('error', 'There was no such a product to delete');
        updateTable();
      })
      .catch((err) => toast.createNotification('error', 'Fuck this shit', err.message));
  };

  const toggleCommentVerification = (data) => {
    let reqUrl = `http://localhost:3000/api/comments/${data.isAccept ? 'reject/' : 'accept/'}${data.id}`;
    fetch(reqUrl, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        updateTable();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1></h1>
      <Table columns={columns} dataSource={comments} bordered loading={pending} />
    </>
  );
}
