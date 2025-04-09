import axios from 'axios';

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
