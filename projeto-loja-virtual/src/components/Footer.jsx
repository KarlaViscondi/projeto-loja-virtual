import React from 'react';
import '../styles/global.css'; 

const Footer = () => {
    return (
        <footer className="footer-container">
            <p className="footer-text">© 2024 Loja Virtual. Todos os direitos reservados.</p>
            <p className="social-media">
                Siga-nos:
                <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
        </footer>
    );
};

export default Footer;
