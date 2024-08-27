// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { addProduct } from '../services/api';
import './ProductStyle.css';

// Exemplo de categorias, geralmente você obteria isso de uma API ou prop
const categories = [
    { id: 'Electronics', name: 'Eletrônicos' },
    { id: 'Clothes', name: 'Roupas' },
    { id: 'Furniture', name: 'Móveis' },
    { id: 'Shoes', name: 'Sapatos' },
    { id: 'Miscellaneous', name: 'Variados' }
];

const AddProduct = ({ onProductAdded }) => {
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        image: '',
        categoryId: '',
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
                categoryId: '',
            });
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    placeholder="Nome"
                    value={productData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={productData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="image"
                    placeholder="URL da Imagem"
                    value={productData.image}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="categoryId">Categoria:</label>
                <select
                    name="categoryId"
                    value={productData.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione a categoria</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="submit-button">Adicionar Produto</button>
        </form>
    );
};

export default AddProduct;
