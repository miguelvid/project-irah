import { useState } from 'react';

type NotificationType = {
  type: 'success' | 'error';
  message: string;
};

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationType | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return { notification, showNotification, closeNotification };
};