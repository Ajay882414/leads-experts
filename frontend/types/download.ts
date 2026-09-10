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


export interface DownloadLeadItem {
  _id: string;
  fullName: string;
  phone: string;
  age?: number;
  gender?: string;
  profession?: string;
  source?: string;
}

export interface MyDownloadsResponse {
  success: boolean;
  downloads: Download[];
}

export interface DownloadLeadsResponse {
  success: boolean;
  leads: DownloadLeadItem[];
}