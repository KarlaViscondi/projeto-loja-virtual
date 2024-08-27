import React, { useState } from 'react';

const AddProduct = ({ onProductAdded }) => {
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        image: '',
        category: '',
    });

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onProductAdded(productData);
        setProductData({
            title: '',
            price: '',
            image: '',
            category: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={productData.title}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={productData.image}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={productData.category}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
