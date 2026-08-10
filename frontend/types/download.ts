export interface Download {

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

  order: {
    _id: string;
    quantity: number;
    totalAmount: number;
  };

  totalLeads: number;

  fileName: string;

  downloadedAt: string;

}