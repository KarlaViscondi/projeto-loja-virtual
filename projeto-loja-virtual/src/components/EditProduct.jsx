import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect
import { getProductById, updateProduct } from '../services/api'; // Importa as funções de serviço para buscar e atualizar produtos
import './Product.css'; // Importa o arquivo CSS para estilização do componente.

// Componente EditProduct para editar os detalhes de um produto existente
const EditProduct = ({ productId, onProductUpdated, onCancel }) => {
    const [product, setProduct] = useState(null); // Estado local para armazenar os dados do produto a ser editado
    // useEffect para buscar os dados do produto quando o productId é fornecido
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId); // Chama a função de API para obter os dados do produto pelo ID
                setProduct(response.data); // Atualiza o estado com os dados do produto recebidos
            } catch (error) {
                console.error('Erro ao buscar produto:', error); // Captura e exibe erros no console se a busca falhar
            }
        };

        if (productId) { // Verifica se o productId foi passado como prop
            fetchProduct(); // Chama a função para buscar o produto
        }
    }, [productId]); // Dependência do useEffect no productId

    // Função handleChange para atualizar o estado quando o usuário modifica os campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestruturação do nome e valor do input que foi modificado
        setProduct(prevProduct => ({ ...prevProduct, [name]: value })); // Atualiza o campo específico do produto no estado
    };

    // Função handleSubmit para lidar com o envio do formulário e atualizar o produto
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página ao enviar o formulário
        try {
            await updateProduct(productId, product); // Chama a função de API para atualizar o produto com os novos dados
            onProductUpdated(product); // Passa o produto atualizado para a função onProductUpdated para informar que a atualização foi bem-sucedida
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error); // Captura e exibe erros no console se a atualização falhar
        }
    };

    // Se o produto ainda não foi carregado, exibe uma mensagem de "Carregando..."
    if (!product) return <div>Carregando...</div>;

    // Renderiza o formulário para editar o produto
    return (
        <div className="edit-product-container">
            <h1>Editar Produto</h1>
            <form className="edit-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={product.title} // Valor do campo título preenchido com os dados do estado
                        onChange={handleChange} // Atualiza o estado quando o usuário modifica o valor
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Imagem URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image} // Valor do campo URL da imagem preenchido com os dados do estado
                        onChange={handleChange} // Atualiza o estado quando o usuário modifica o valor
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price} // Valor do campo preço preenchido com os dados do estado
                        onChange={handleChange} // Atualiza o estado quando o usuário modifica o valor
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Salvar</button> {/* Botão para enviar o formulário e salvar as alterações */}
                </div>
            </form>
        </div>
    );
};

export default EditProduct; // Exporta o componente EditProduct para ser utilizado em outras partes da aplicação
