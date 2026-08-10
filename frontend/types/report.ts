export interface DashboardReport {

  totalUsers: number;

  totalPlatforms: number;

  totalLeads: number;

  totalOrders: number;

  totalDownloads: number;

  totalRevenue: number;

}

export interface SalesReport {

  totalRevenue: number;

  totalOrders: number;

}

export interface PlatformReport {

  _id: string;

  name: string;

  totalLeads: number;

  availableLeads: number;

  soldLeads: number;

}

export interface UserReport {

  _id: string;

  fullName: string;

  email: string;

  role: string;

}

export interface OrderReport {

  _id: string;

  quantity: number;

  totalAmount: number;

}

export interface DownloadReport {

  _id: string;

  fileName: string;

  totalLeads: number;

}