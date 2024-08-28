import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1'; // https://api.escuelajs.co/api/v1/products

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const addProduct = (product) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
export const getCategory = () => axios.get(`${API_URL}/categories`);
