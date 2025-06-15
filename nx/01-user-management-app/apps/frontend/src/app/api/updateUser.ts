import axiosInstance from './axiosInstance';

export const updateUser = async (
  id: number,
  updatedData: Record<string, any>
) => {
  try {
    const response = await axiosInstance.put(
      `/users/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
