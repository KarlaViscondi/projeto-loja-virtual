import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importar axios
import './ProductStyle.css'; 

const DeleteProduct = ({ productId, onProductUpdated, onClose }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productId){
                console.log(onClose)
                await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
                onClose(false)
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
                {/* <div className="form-actions">
                    <button type="submit" className="submit-button">Cancelar</button> 
                </div> */}
        </div>
    );
};

export default DeleteProduct;
