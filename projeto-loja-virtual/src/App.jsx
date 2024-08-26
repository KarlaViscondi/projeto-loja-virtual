import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import { getProducts } from './services/api';

const App = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);

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

    return (
        <div className="app">
            <Header setSelectedCategory={setSelectedCategory} setSelectedPriceRange={setSelectedPriceRange} />
            <ProductList
                products={products}
                selectedCategory={selectedCategory}
                selectedPriceRange={selectedPriceRange}
            />
            <Footer />
        </div>
    );
};

export default App;
