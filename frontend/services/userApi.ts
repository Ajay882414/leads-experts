import api from "@/lib/axios";

// Get All Users
export const getUsers = async (
  params?: {
    search?: string;
    status?: string;
  }
) => {

  const response =
    await api.get(
      "/users",
      {
        params,
      }
    );

  return response.data;

};

// Get Single User
export const getUser = async (
  id: string
) => {
  const response = await api.get(
    `/users/${id}`
  );

  return response.data;
};

// Update User Status
export const updateUserStatus =
  async (
    id: string,
    status: string
  ) => {
    const response =
      await api.patch(
        `/users/${id}/status`,
        {
          status,
        }
      );

    return response.data;
  };

// Delete User
export const deleteUser = async (
  id: string
) => {
  const response =
    await api.delete(
      `/users/${id}`
    );

  return response.data;
};


export const getUserStats =
  async () => {
    const response =
      await api.get(
        "/users/stats"
      );

    return response.data;
  };


export const updateUser =
  async (
    id: string,
    data: any
  ) => {

    const response =
      await api.put(
        `/users/${id}`,
        data
      );

    return response.data;

  };


