import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../services/api';

const EditProductForm = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(productId)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Erro ao buscar produto:', error));
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(productId, product)
        .then(response => {
            // Atualize o estado ou notifique o usuário
            console.log('Produto atualizado:', response.data);
            // Opcional: Atualize a lista de produtos no componente pai
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
    };

    if (!product) return <div>Carregando...</div>;

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Nome"
            required
        />
        <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Preço"
            required
        />
        <input
            type="text"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            placeholder="URL da Imagem"
            required
        />
        <button type="submit">Atualizar Produto</button>
        </form>
    );
};

export default EditProductForm;
