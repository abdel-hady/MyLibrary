// src/api/orders.js
import axiosInstance from "./axiosInstance";

const API_URL = "/orders"; // Base URL is already set in axiosInstance

export const getAllOrders = async () => {
  const response = await axiosInstance.get(API_URL);
  return response; // Response is already processed by the interceptor
};

export const addOrder = async (order) => {
  const response = await axiosInstance.post(API_URL, order);
  return response;
};

export const updateOrder = async (id, order) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, order);
  return response;
};

export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response;
};
