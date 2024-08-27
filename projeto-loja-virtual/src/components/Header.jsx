import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
        <img src={logo} alt="Logo da Loja" className="logo" />
        <h1>Loja Virtual</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/manage-products">Gerenciar Produtos</Link>
        </nav>
        </header>
    );
};

export default Header;
