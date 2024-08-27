import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import './ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductAdded = async (productData) => {
        try {
            await addProduct(productData); // Use addProduct em vez de createProduct
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    const handleProductUpdated = async (productId, productData) => {
        try {
            await updateProduct(productId, productData); // use updateProduct em vez de updateProduct
            const response = await getProducts();
            setProducts(response.data);
            setEditingProductId(null); // Fecha o formulário de edição
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const handleProductDeleted = async (productId) => {
        try {
            await deleteProduct(productId);
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    return (
        <div className="manage-products-container">
            <h1>Gerenciar Produtos</h1>
            <div className="add-product-container">
                <AddProduct onProductAdded={handleProductAdded} />
            </div>
            {editingProductId && (
                <div className="edit-product-container">
                    <EditProduct 
                        productId={editingProductId} 
                        onProductUpdated={handleProductUpdated} 
                    />
                </div>
            )}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
                        <div>
                            <h2>{product.title}</h2>
                            <p>Preço: {product.price}</p>
                            <button onClick={() => {
                                setEditingProductId(product.id);
                                setSelectedProduct(product);
                            }}>Edit</button>
                            <button onClick={() => handleProductDeleted(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProducts;
