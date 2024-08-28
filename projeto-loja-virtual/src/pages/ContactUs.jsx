import React, { useState } from 'react';
import'../styles/contactUs.css'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
    };

    return (
        <div className="contact-us-container">
            <h1>Contato</h1>
            <p>Se você tiver alguma dúvida ou precisar de assistência, entre em contato conosco preenchendo o formulário abaixo:</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensagem:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
            <div className="contact-info">
                <h2>Informações de Contato</h2>
                <p>Email: contato@loja-virtual.com</p>
                <p>Telefone: (11) 1234-5678</p>
                <p>Endereço: Rua Exemplo, 123, Cidade, Estado</p>
            </div>
        </div>
    );
};

export default ContactUs;
