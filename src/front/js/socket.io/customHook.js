import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Reemplaza con la URL de tu servidor

export const useSocket = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('new_notification', (data) => {
      setNotifications([...notifications, data]);
    });

    return () => {
      socket.off('new_notification');
    };
  }, [notifications]);

  return { notifications, socket };
};