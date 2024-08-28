import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../styles/productStyle.css';

const EditProduct = ({ productId, onClose }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
                response.data.images = response.data.images.join(', ')
                response.data.images = response.data.images.split(', ')
                response.data.images = response.data.images.join(', ')
                setProduct(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            product.images = JSON.parse(product.images)
            if (productId){
                await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, product);
                onClose(false)
            }
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    if (!product) return <div>Carregando...</div>;

    return (
        <div className="edit-product-container">
            <h1>Editar Produto</h1>
            <form className="edit-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Imagem URL:</label>
                    <input
                        type="text"
                        name="images"
                        value={product.images}
                        onChange={(e) => handleChange({
                            target: { name: 'images', value: e.target.value.split(',').map(url => url.trim()) }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Categoria:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category.name}
                        readOnly
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Salvar</button> 
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
