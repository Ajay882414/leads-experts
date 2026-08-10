export interface Notification {

  _id: string;

  title: string;

  message: string;

  type:
    | "User"
    | "Lead"
    | "Platform"
    | "Order"
    | "System";

  isRead: boolean;

  createdAt: string;

}