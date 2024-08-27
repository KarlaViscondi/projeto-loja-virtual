import React, { useState } from 'react';
import { addProduct } from '../services/api';  

const AddProduct = ({ onProductAdded }) => {
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        image: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(productData);
            if (onProductAdded) onProductAdded();  
            setProductData({
                title: '',
                price: '',
                image: '',
                category: '',
            });
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Nome"
                value={productData.title}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Preço"
                value={productData.price}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                placeholder="URL Imagem"
                value={productData.image}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Categoria"
                value={productData.category}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
