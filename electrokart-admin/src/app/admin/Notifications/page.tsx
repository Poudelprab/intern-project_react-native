"use client";

import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '@/actions/notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    {
      id: number;
      user_email: string;
      message: string;
      total_price: number | null;
      created_at: string | null;
    }[]
  >([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications();
        setNotifications(data || []);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }
    loadNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <p>User Email: {notification.user_email}</p>
            <p>Message: {notification.message}</p>
            <p>Total Price: {notification.total_price ?? 'N/A'}</p>
            <p>Created At: {notification.created_at ?? 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
