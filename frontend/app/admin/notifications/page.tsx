"use client";

import { useEffect, useState } from "react";

import {
  getNotifications,
} from "@/services/notificationApi";

import NotificationTable from "@/components/admin/notification/NotificationTable";

import NotificationLoading from "@/components/admin/notification/NotificationLoading";

import NotificationEmpty from "@/components/admin/notification/NotificationEmpty";

export default function NotificationsPage() {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {

      try {

        const res =
          await getNotifications();

        setNotifications(
          res.notifications
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all notifications
        </p>

      </div>

      {loading ? (
        <NotificationLoading />
      ) : notifications.length === 0 ? (
        <NotificationEmpty />
      ) : (
        <NotificationTable
          notifications={notifications}
        />
      )}

    </div>

  );

}