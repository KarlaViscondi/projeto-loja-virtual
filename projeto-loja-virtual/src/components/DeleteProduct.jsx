import React, { useState } from 'react';
import axios from 'axios'; 
import '../styles/productStyle.css';

const DeleteProduct = ({ productId, onClose }) => {
    const [successMessage, setSuccessMessage] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId){
                await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
                setSuccessMessage('Produto excluído com sucesso!');
                setTimeout(() => {
                    setSuccessMessage('');
                    if (onClose) onClose(false);
                }, 1000);
            }
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
        }
    };

    if (!productId) return <div>Carregando...</div>;

    return (
        <div className="edit-product-container">
            <h1>Deletar Produto</h1>
            <h3>Você realmente gostaria de remover esse produto?</h3>
                <div className="form-actions">
                    <button className="submit-button" onClick={handleSubmit} >Excluir</button> 
                </div> 
                {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default DeleteProduct;
