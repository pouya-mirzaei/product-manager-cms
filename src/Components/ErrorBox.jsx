import { Alert } from 'antd';
import React from 'react';

const ErrorBox = ({ message }) => {
  return <Alert message="Error" description={message} type="error" showIcon />;
};

export default ErrorBox;
