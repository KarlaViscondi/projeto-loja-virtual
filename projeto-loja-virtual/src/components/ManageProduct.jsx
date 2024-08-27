import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addProduct, updateProduct, getProductById } from '../services/api';

Modal.setAppElement('#root'); // Necessário para acessibilidade

const ManageProduct = ({ isOpen, onRequestClose, productId, onProductAdded, onProductUpdated }) => {
    const [product, setProduct] = useState({
        title: '',
        image: '',
        price: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const response = await getProductById(productId); // Função para obter um produto específico
                    setProduct(response.data);
                } catch (error) {
                    console.error('Erro ao buscar o produto:', error);
                }
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
            if (productId) {
                await updateProduct(productId, product);
                onProductUpdated();
            } else {
                await addProduct(product);
                onProductAdded();
            }
            onRequestClose(); // Fecha a modal após adicionar ou atualizar
        } catch (error) {
            console.error('Erro ao adicionar/atualizar o produto:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={productId ? "Editar Produto" : "Adicionar Produto"}
        >
            <h1>{productId ? "Editar Produto" : "Adicionar Produto"}</h1>
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
                <button type="submit">{productId ? "Atualizar" : "Adicionar"}</button>
                <button type="button" onClick={onRequestClose}>Cancelar</button>
            </form>
        </Modal>
    );
};

export default ManageProduct;
