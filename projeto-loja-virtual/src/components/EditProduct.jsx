import React, { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../services/api';

const EditProduct = ({ productId, onProductUpdated }) => {
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

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(productId, product);
            onProductUpdated();
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    if (!product) return null;

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
                    />
                </div>
                <div>
                    <label>Imagem URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditProduct;
