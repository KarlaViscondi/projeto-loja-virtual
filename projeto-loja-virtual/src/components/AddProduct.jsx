import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado local do componente
import './ProductStyle.css'; // Importa o arquivo CSS para estilização do componente
import { addProduct } from '../services/api';  // Importa a função addProduct da API para adicionar um novo produto

// Componente AddProduct para adicionar novos produtos
const AddProduct = ({ onProductAdded }) => {
    // Estado local para armazenar os dados do novo produto
    const [productData, setProductData] = useState({
        title: '',     // Título do produto
        price: '',     // Preço do produto
        image: '',     // URL da imagem do produto
        category: '',  // Categoria do produto
    });

    // Função handleChange para atualizar o estado quando o usuário insere dados no formulário
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestruturação do nome e valor do input que foi modificado
        setProductData({
            ...productData,   // Mantém os outros campos intactos
            [name]: value,    // Atualiza o campo específico com o novo valor
        });
    };

    // Função handleSubmit para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário
        try {
            await addProduct(productData); // Chama a função para adicionar o produto usando os dados do estado
            if (onProductAdded) onProductAdded();  // Se a função onProductAdded for passada como prop, a chama para atualizar a lista de produtos
            setProductData({  // Reseta os campos do formulário após a adição bem-sucedida
                title: '',
                price: '',
                image: '',
                category: '',
            });
        } catch (error) {
            console.error('Erro ao adicionar produto:', error); // Captura e exibe erros no console se a adição falhar
        }
    };

    // Renderiza o formulário para adicionar um produto
    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Nome</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Nome do Produto"
                    value={productData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Preço</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Preço em $"
                    value={productData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">URL Imagem</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="URL da Imagem"
                    value={productData.image}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Categoria</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Categoria do Produto"
                    value={productData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="submit-button">Adicionar Produto</button>
        </form>
    );
};

export default AddProduct; // Exporta o componente AddProduct para ser utilizado em outras partes da aplicação
