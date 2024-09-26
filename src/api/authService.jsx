import axiosInstance from './axiosInstance';

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (err) {
    throw err;
  }
};
