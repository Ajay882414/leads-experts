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

// User Feed Fetch (1st order lock verification)
export const getSecretGrowthHubFeed = async (): Promise<UserHubResponse> => {
  const response = await api.get<UserHubResponse>("/secret-growth-hub");
  return response.data;
};

// Admin: Get all posts
export const getAdminHubPosts = async (): Promise<{
  success: boolean;
  total: number;
  posts: HubPost[];
}> => {
  const response = await api.get("/secret-growth-hub/admin");
  return response.data;
};

// Admin: Create Post with Desktop File (Multipart/form-data)
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

// Admin: Delete Post
export const deleteAdminHubPost = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/secret-growth-hub/admin/${id}`);
  return response.data;
};