import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { getProducts } from './services/api';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

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
                <Route path="/" element={<Home  />} />
                <Route path="/aboutus" element={<AboutUs  />} />
                <Route path="/contactus" element={<ContactUs  />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
