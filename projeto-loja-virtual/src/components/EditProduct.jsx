import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importar axios
import './ProductStyle.css'; 

const EditProduct = ({ productId, onProductUpdated, onClose }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
                console.log(response.data.images)
                console.log(response.data.images.join(', '))
                response.data.images = response.data.images.join(', ')
                response.data.images = response.data.images.split(', ')
                response.data.images = response.data.images.join(', ')
                setProduct(response.data);
                console.log(response.data.images)
                // console.log(typeof response.data.images.join(', '))
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
                console.log(product)
                await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, product);
                onClose(false)
            }
            // console.log(product.images.join(', '))
            // await axios.put(`https://api.escuelajs.co/api/v1/products/${productId}`, product);
            // if (onProductUpdated) onProductUpdated(); // Atualizar a lista de produtos
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
                    <button type="submit" className="submit-button">Salvar</button> {/* Botão para enviar o formulário e salvar as alterações */}
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
