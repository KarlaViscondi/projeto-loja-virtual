import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header>
        <img src={logo} alt="Logo da Loja" className="logo" />
        <h1>Loja Virtual</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#products">Produtos</a>
            <a href="#contact">Contato</a>
        </nav>
        </header>
    );
};

export default Header;
