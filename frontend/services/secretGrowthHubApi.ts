import api from "@/lib/axios";

export interface HubPost {
  _id: string;
  content: string;
  postType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "PDF" | "LINK";
  fileUrl: string;
  fileName: string;
  externalLink: string;
  buttonText: string;
  isPinned: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface UserHubResponse {
  success: boolean;
  isUnlocked: boolean;
  message?: string;
  total?: number;
  posts: HubPost[];
}

export const getSecretGrowthHubFeed = async (): Promise<UserHubResponse> => {
  const response = await api.get<UserHubResponse>("/secret-growth-hub");
  return response.data;
};

export const getAdminHubPosts = async (): Promise<{
  success: boolean;
  total: number;
  posts: HubPost[];
}> => {
  const response = await api.get("/secret-growth-hub/admin");
  return response.data;
};

export const createAdminHubPost = async (
  formData: FormData
): Promise<{ success: boolean; message: string; post: HubPost }> => {
  const response = await api.post("/secret-growth-hub/admin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateAdminHubPost = async (
  id: string,
  formData: FormData
): Promise<{ success: boolean; message: string; post: HubPost }> => {
  const response = await api.put(`/secret-growth-hub/admin/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteAdminHubPost = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/secret-growth-hub/admin/${id}`);
  return response.data;
};