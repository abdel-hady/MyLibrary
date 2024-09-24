import axiosInstance from '../api/axiosInstance';

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response;
  } catch (err) {
    throw err;
  }
};
