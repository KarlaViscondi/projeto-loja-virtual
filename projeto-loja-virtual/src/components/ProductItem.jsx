import React from 'react';


const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>${product.price}</p>
        </div>
    );
};

export default ProductItem;

