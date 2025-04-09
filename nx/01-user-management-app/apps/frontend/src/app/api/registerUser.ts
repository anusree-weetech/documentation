import axiosInstance from './axiosInstance';

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
