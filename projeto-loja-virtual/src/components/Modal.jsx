import React from 'react';
import '../styles/modalStyle.css'; 

const Modal = ({ onClose, children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
