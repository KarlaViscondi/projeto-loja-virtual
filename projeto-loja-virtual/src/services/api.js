import axios from 'axios';

// URL base da API
const API_URL = 'https://fakestoreapi.com/products';

// Funções para interagir com a API
export const getProducts = () => axios.get(API_URL);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const addProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (productId, productData) => {
    return axios.put(`${API_URL}/${productId}`, productData);
};

export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
