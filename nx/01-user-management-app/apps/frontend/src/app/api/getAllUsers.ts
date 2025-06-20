import axiosInstance from './axiosInstance';

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
