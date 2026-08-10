import api from "@/lib/axios";

// Get All Notifications
export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

// Get Single Notification
export const getNotification = async (id: string) => {
  const response = await api.get(`/notifications/${id}`);
  return response.data;
};

// Mark As Read
export const markAsRead = async (id: string) => {
  const response = await api.patch(
    `/notifications/${id}/read`
  );

  return response.data;
};

// Delete Notification
export const deleteNotification = async (id: string) => {
  const response = await api.delete(
    `/notifications/${id}`
  );

  return response.data;
};

// Notification Stats
export const getNotificationStats = async () => {
  const response = await api.get(
    "/notifications/stats"
  );

  return response.data;
};