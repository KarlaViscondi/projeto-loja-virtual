import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../services/api';

const EditProduct = ({ productId, onProductUpdated, onCancel }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
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
            console.log('Dados do produto a serem enviados para atualização:', productId, product);
            await updateProduct(productId, product);
            onProductUpdated(product); // Passando o produto atualizado
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    if (!product) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Editar Produto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Imagem URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditProduct;
