// src/components/Modal.jsx
import React from 'react';
import './Modal.css'; // Adicione seu estilo aqui

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
