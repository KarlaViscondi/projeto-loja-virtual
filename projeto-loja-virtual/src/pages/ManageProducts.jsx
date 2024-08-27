import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import './ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

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
    }, [products]);

    // Paginação
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProductAdded = async (productData) => {
        try {
            await addProduct(productData);
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    const handleProductUpdated = async (productData) => {
        try {
            if (!editingProductId) {
                throw new Error('Product ID is missing');
            }
            console.log('Atualizando produto com ID:', editingProductId, 'Dados:', productData);
            await updateProduct(editingProductId, productData);
            const response = await getProducts();
            console.log('Resposta da API:', response);  // Verifique se a resposta é válida
            if (Array.isArray(response.data)) {
                console.log('Produtos atualizados:', response.data);  // Verifique se a lista contém produtos
                setProducts(response.data);
                setEditingProductId(null);
            } else {
                console.error('A resposta da API não é um array:', response.data);
            }
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
                        onCancel={() => setEditingProductId(null)}
                    />
                </div>
            )}
            <div className="product-list">
                {currentProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.title} />
                        <div>
                            <h2>{product.title}</h2>
                            <p>Preço: ${product.price}</p>
                            <button onClick={() => setEditingProductId(product.id)}>
                                Editar
                            </button>
                            <button onClick={() => handleProductDeleted(product.id)}>
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageProducts;
