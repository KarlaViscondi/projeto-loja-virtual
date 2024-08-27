// Importando as dependências do React e os componentes necessários
import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem'; // Componente para exibir um item de produto
import AddProduct from '../components/AddProduct'; // Componente para adicionar um novo produto
import EditProduct from '../components/EditProduct'; // Componente para editar um produto existente
import Modal from '../components/Modal'; // Componente para exibir modais (janelas modais)
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/api'; // Funções de API para manipulação de produtos
import './ProductList.css'; // Importando o arquivo de estilo CSS para estilizar a lista de produtos

// Componente principal Home
const Home = () => {
    // Definindo estados para controlar as variáveis do componente
    const [products, setProducts] = useState([]); // Lista de produtos
    const [editingProductId, setEditingProductId] = useState(null); // ID do produto que está sendo editado
    const [selectedCategory, setSelectedCategory] = useState('all'); // Categoria selecionada para filtro
    const [minPrice, setMinPrice] = useState(''); // Preço mínimo para filtro
    const [maxPrice, setMaxPrice] = useState(''); // Preço máximo para filtro
    const [currentPage, setCurrentPage] = useState(1); // Página atual na paginação
    const [productsPerPage] = useState(5); // Número de produtos por página
    const [sortOrder, setSortOrder] = useState('asc'); // Ordem de classificação (ascendente ou descendente)
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false); // Estado para abrir/fechar modal de adicionar produto
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false); // Estado para abrir/fechar modal de editar produto

    // useEffect para buscar os produtos da API quando o componente é montado ou a lista de produtos é atualizada
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(); // Faz a chamada à API para obter os produtos
                setProducts(response.data); // Atualiza o estado dos produtos com os dados recebidos
            } catch (error) {
                console.error('Erro ao buscar produtos:', error); // Exibe erro caso a requisição falhe
            }
        };

        fetchProducts(); // Chama a função para buscar os produtos
    }, [products]); // Dependência: atualiza quando a lista de produtos muda

    // Filtrando os produtos com base na categoria e no intervalo de preços selecionados
    const filteredProducts = products.filter(product => {
        const inCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const inPriceRange = (minPrice === '' || product.price >= minPrice) &&
            (maxPrice === '' || product.price <= maxPrice);
        return inCategory && inPriceRange; // Retorna os produtos que estão na categoria e no intervalo de preço
    });

    // Ordenando os produtos filtrados com base no título (A-Z ou Z-A)
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title); // Ordena em ordem ascendente
        } else {
            return b.title.localeCompare(a.title); // Ordena em ordem descendente
        }
    });

    // Cálculo dos índices para determinar quais produtos serão exibidos na página atual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Obtém os produtos da página atual

    // Gerando o array de números de páginas para paginação
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedProducts.length / productsPerPage); i++) {
        pageNumbers.push(i); // Adiciona o número da página ao array
    }

    // Função para mudar a página quando o usuário clica em um número de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Atualiza o estado da página atual
    };

    // Função para adicionar um novo produto (acionada ao enviar o formulário de adicionar produto)
    const handleProductAdded = async (productData) => {
        try {
            await addProduct(productData); // Chama a função da API para adicionar o produto
            const response = await getProducts(); // Busca a lista atualizada de produtos
            setProducts(response.data); // Atualiza o estado dos produtos
            setIsAddProductModalOpen(false); // Fecha o modal de adicionar produto
        } catch (error) {
            console.error('Erro ao adicionar produto:', error); // Exibe erro caso a requisição falhe
        }
    };

    // Função para atualizar um produto existente (acionada ao enviar o formulário de edição)
    const handleProductUpdated = async (productData) => {
        try {
            if (!editingProductId) {
                throw new Error('Product ID is missing'); // Verifica se o ID do produto está presente
            }
            console.log('Atualizando produto com ID:', editingProductId, 'Dados:', productData);
            await updateProduct(editingProductId, productData); // Chama a função da API para atualizar o produto
            const response = await getProducts(); // Busca a lista atualizada de produtos
            console.log('Resposta da API:', response);  // Verifique se a resposta é válida
            if (Array.isArray(response.data)) {
                console.log('Produtos atualizados:', response.data);  // Verifique se a lista contém produtos
                setProducts(response.data); // Atualiza o estado dos produtos
                setEditingProductId(null); // Reseta o ID do produto que estava sendo editado
                setIsEditProductModalOpen(false); // Fecha o modal de edição
            } else {
                console.error('A resposta da API não é um array:', response.data); // Exibe erro caso a resposta não seja válida
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error); // Exibe erro caso a requisição falhe
        }
    };

    // Função para excluir um produto (acionada ao clicar no botão de excluir)
    const handleProductDeleted = async (productId) => {
        try {
            await deleteProduct(productId); // Chama a função da API para excluir o produto
            const response = await getProducts(); // Busca a lista atualizada de produtos
            setProducts(response.data); // Atualiza o estado dos produtos
        } catch (error) {
            console.error('Erro ao excluir produto:', error); // Exibe erro caso a requisição falhe
        }
    };

    // Retorna o JSX para renderizar a página Home
    return (
        <div className="home-container">
            {/* Seção de filtros de categoria, preço e ordem */}
            <div className="filters">
                <div className="category-filters">
                    <button onClick={() => setSelectedCategory('all')}>Todos</button>
                    <button onClick={() => setSelectedCategory('electronics')}>Eletrônicos</button>
                    <button onClick={() => setSelectedCategory('jewelery')}>Joias</button>
                    <button onClick={() => setSelectedCategory("women's clothing")}>Roupas Femininas</button>
                    <button onClick={() => setSelectedCategory("men's clothing")}>Roupas Masculinas</button>
                </div>
                <div className="price-filter">
                    <input
                        type="number"
                        placeholder="Preço Mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)} // Atualiza o estado do preço mínimo
                    />
                    <input
                        type="number"
                        placeholder="Preço Máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)} // Atualiza o estado do preço máximo
                    />
                </div>
                <div className="sort-filter">
                    <button onClick={() => setSortOrder('asc')}>Ordenar A-Z</button>
                    <button onClick={() => setSortOrder('desc')}>Ordenar Z-A</button>
                </div>
            </div>

            {/* Botão para abrir o modal de adicionar novo produto */}
            <div className="add-product-button-container">
                <button className="add-product-button" onClick={() => setIsAddProductModalOpen(true)}>
                    Adicionar novo produto
                </button>
            </div>

            {/* Exibição da lista de produtos */}
            <div className="product-list">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <div>
                                <h2>{product.title}</h2>
                                <p>Preço: ${product.price}</p>
                                <button className="edit-button" onClick={() => { setEditingProductId(product.id); setIsEditProductModalOpen(true); }}>
                                    Editar
                                </button>
                                <button className="delete-button" onClick={() => handleProductDeleted(product.id)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Não há produtos para exibir</p>
                )}
            </div>

            {/* Seção de paginação */}
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>

            {/* Modal para adicionar novo produto */}
            {isAddProductModalOpen && (
                <Modal onClose={() => setIsAddProductModalOpen(false)}>
                    <AddProduct onProductAdded={handleProductAdded} />
                </Modal>
            )}

            {/* Modal para editar produto existente */}
            {isEditProductModalOpen && (
                <Modal onClose={() => { setEditingProductId(null); setIsEditProductModalOpen(false); }}>
                    <EditProduct 
                        productId={editingProductId} 
                        onProductUpdated={handleProductUpdated} 
                        onCancel={() => { setEditingProductId(null); setIsEditProductModalOpen(false); }}
                    />
                </Modal>
            )}
        </div>
    );
};

// Exporta o componente Home para ser utilizado em outras partes da aplicação
export default Home;
