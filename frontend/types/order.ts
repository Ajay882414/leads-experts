export interface Order {
  _id: string;

  user: {
    _id: string;
    fullName: string;
    email: string;
  };

  platform: {
    _id: string;
    name: string;
  };

  quantity: number;

  pricePerLead: number;

  totalAmount: number;

  status: string;

  createdAt: string;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}