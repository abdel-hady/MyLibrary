import axiosInstance from "./axiosInstance";

const API_URL = "/products";

export const getAllProducts = async () => {
  const response = await axiosInstance.get(API_URL);
  console.log(response)
  return response.products;
};

export const addProduct = async (product) => {
  const response = await axiosInstance.post(API_URL, product);
  return response;
};

export const updateProduct = async (id, product) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, product);
  return response;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response;
};
