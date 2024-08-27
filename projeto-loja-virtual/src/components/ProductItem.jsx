// src/components/ProductItem.jsx
import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <div className="product-item">
            <img src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Preço: {product.price}</p>
            <p>Categoria: {product.category.name}</p>
            <div className="product-actions">
                <button onClick={onEdit}>Editar</button>
                <button onClick={onDelete}>Excluir</button>
            </div>
        </div>
    );
};

export default ProductItem;
