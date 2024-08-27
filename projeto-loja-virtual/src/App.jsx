import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ManageProducts from './pages/ManageProducts'; // Verifique se o caminho está correto
import { getProducts } from './services/api';

const App = () => {
    const [products, setProducts] = useState([]);

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
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ProductList products={products} />} />
                <Route path="/manage-products" element={<ManageProducts />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
