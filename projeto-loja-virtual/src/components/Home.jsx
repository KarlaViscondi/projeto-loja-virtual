// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api';
import './ProductList.css'; 

const Home = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc'); // Para ordenar os produtos

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

    // Filtra produtos com base na categoria selecionada e no preço
    const filteredProducts = products.filter(product => {
        const inCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const inPriceRange = (minPrice === '' || product.price >= minPrice) &&
        (maxPrice === '' || product.price <= maxPrice);
        return inCategory && inPriceRange;
    });

    // Ordena produtos
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title); // Ordenação alfabética crescente
        } else {
            return b.title.localeCompare(a.title); // Ordenação alfabética decrescente
        }
    });

    // Paginação
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedProducts.length / productsPerPage); i++) {
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
            await updateProduct(editingProductId, productData);
            const response = await getProducts();
            if (Array.isArray(response.data)) {
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
        <div className="home-container">
            <div className="filters">
                <div className="category-filters">
                    <button onClick={() => setSelectedCategory('all')}>Todos</button>
                    <button onClick={() => setSelectedCategory('electronics')}>Eletrônicos</button>
                    <button onClick={() => setSelectedCategory('jewelery')}>Joias</button>
                    <button onClick={() => setSelectedCategory("women's clothing")}>Roupas Femininas</button>
                    <button onClick={() => setSelectedCategory("men's clothing")}>Roupas Masculinas</button>
                </div>
                <div className="price-filter">
                    <input
                        type="number"
                        placeholder="Preço Mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Preço Máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
                <div className="sort-filter">
                    <button onClick={() => setSortOrder('asc')}>Ordenar A-Z</button>
                    <button onClick={() => setSortOrder('desc')}>Ordenar Z-A</button>
                </div>
            </div>
            <div className="product-list">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
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
                    ))
                ) : (
                    <p>Não há produtos para exibir</p>
                )}
            </div>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>
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
        </div>
    );
};

export default Home;
