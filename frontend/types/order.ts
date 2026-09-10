export type OrderStatus =
  | "Pending"
  | "Completed"
  | "Cancelled";

export interface OrderUser {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
}

export interface OrderPlatform {
  _id: string;
  name: string;
}

export interface PurchasedLead {
  _id: string;
  fullName: string;
  phone: string;
  age?: number;
  gender?: string;
  profession?: string;
  source?: string;
  sourceTimestamp?: string | null;
}

export interface Order {
  _id: string;

  user: OrderUser;

  platform: OrderPlatform;

  quantity: number;

  pricePerLead: number;

  totalAmount: number;

  status: OrderStatus;

  purchasedLeads?: PurchasedLead[];

  createdAt: string;

  updatedAt: string;
}

export interface OrderStats {
  totalOrders: number;

  pendingOrders: number;

  completedOrders: number;

  cancelledOrders: number;
}

export interface GetOrdersResponse {
  success: boolean;

  total: number;

  orders: Order[];
}

export interface GetOrderResponse {
  success: boolean;

  order: Order;
}

export interface GetOrderStatsResponse {
  success: boolean;

  stats: OrderStats;
}

export interface UpdateOrderStatusResponse {
  success: boolean;

  message: string;

  order: Order;
}

export interface DeleteOrderResponse {
  success: boolean;

  message: string;
}




// user dashbaord

export interface UserOrderPlatform {
  _id: string;
  name: string;
  slug?: string;
  pricePerLead?: number;
}

export interface PurchasedLeadItem {
  _id: string;
  fullName: string;
  phone: string;
  age?: number;
  gender?: string;
  profession?: string;
  source?: string;
  status?: string;
}

export interface UserOrder {
  _id: string;
  user: string;
  platform: UserOrderPlatform;
  quantity: number;
  pricePerLead: number;
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
  purchasedLeads: string[] | PurchasedLeadItem[];
  createdAt: string;
  updatedAt: string;
}

export interface MyOrdersResponse {
  success: boolean;
  total: number;
  orders: UserOrder[];
}

export interface DownloadLeadsResponse {
  success: boolean;
  orderId: string;
  total: number;
  leads: PurchasedLeadItem[];
}



