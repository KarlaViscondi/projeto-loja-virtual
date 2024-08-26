import React, { useState } from 'react';
import ProductItem from './ProductItem';
import './ProductList.css'; // Certifique-se de que este arquivo exista

const ProductList = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc'); // Para ordenar os produtos

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

    return (
        <div className="product-list-container">
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
                        <ProductItem key={product.id} product={product} />
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
        </div>
    );
};

export default ProductList;
