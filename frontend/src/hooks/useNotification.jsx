import React, { useState, useCallback } from 'react';
import { notification } from 'antd';

const useNotification = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  const createNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
      duration: 4.5,
      showProgress: true,
      pauseOnHover: false,
      onClose: () => {
        setNotificationCount(notificationCount - 1);
      },
    });
    setNotificationCount(notificationCount + 1);
  };

  return {
    notificationCount,
    createNotification,
  };
};

export default useNotification;
