import React, { useState } from 'react';
import { createProduct } from '../services/api';

const AddProductForm = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { title, price, image };

        createProduct(newProduct)
        .then(response => {
            // Atualize o estado ou notifique o usuário
            console.log('Produto criado:', response.data);
            // Opcional: Atualize a lista de produtos no componente pai
        })
        .catch(error => console.error('Erro ao criar produto:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nome"
            required
        />
        <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
            required
        />
        <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL da Imagem"
            required
        />
        <button type="submit">Adicionar Produto</button>
        </form>
    );
};

export default AddProductForm;
