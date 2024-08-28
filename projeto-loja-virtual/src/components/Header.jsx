import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../styles/global.css'; 

const Header = () => {
    return (
        <header className="header-container">
            <div className="logo-container">
                <img src={logo} alt="Logo da Loja" className="logo" />
                <h1 className="store-name">Loja Virtual</h1>
            </div>
            <nav className="navigation">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/aboutus" className="nav-link">Sobre Nós</Link>
                <Link to="/contactus" className="nav-link">Contato</Link>
            </nav>
        </header>
    );
};

export default Header;
