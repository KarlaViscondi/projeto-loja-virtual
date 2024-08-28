import React, { useEffect, useState } from 'react';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import DeleteProduct from '../components/DeleteProduct'
import Modal from '../components/Modal';
import { getProducts, addProduct, updateProduct} from '../services/api';
import { categoryTranslations } from '../translations/categoryTranslation';
import '../styles/homeStyle.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [isDeleteProductModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };
        fetchProducts();
    }, [products]);

    const filteredProducts = products.filter(product => {
        const inCategory = selectedCategory === 'all' || product.category.name === selectedCategory;
        const inPriceRange = (minPrice === '' || product.price >= minPrice) &&
        (maxPrice === '' || product.price <= maxPrice);
        return inCategory && inPriceRange;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleProductAdded = async (productData) => {
        try {
            await addProduct(productData);
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    const handleProductUpdated = async (productData) => {
        try {
            if (!editingProductId) {
                throw new Error('Product ID is missing');
            }
            await updateProduct(editingProductId, productData);
            const response = await getProducts();
            if (Array.isArray(response.data)) {
                setProducts(response.data);
                setEditingProductId(null);
            } else {
                console.error('A resposta da API não é um array:', response.data);
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const handleProductDeleted = async (productId) => {
        try {
            setEditingProductId(productId)
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    const translateCategory = (categoryName) => {
        return categoryTranslations[categoryName] || categoryName; 
    };

    return (
        <div className="home-container">
            <div className="add-product-button-container">
                <button className="add-product-button" onClick={() => setIsAddProductModalOpen(true)}>
                    Adicionar novo produto
                </button>
            </div>
            <div className="content-wrapper">
                <div className="filters">
                    <div className="category-filters">
                        <button onClick={() => setSelectedCategory('all')}>Todos</button>
                        <button onClick={() => setSelectedCategory('Electronics')}>Eletrônicos</button>
                        <button onClick={() => setSelectedCategory('Clothes')}>Roupas</button>
                        <button onClick={() => setSelectedCategory('Furniture')}>Móveis</button>
                        <button onClick={() => setSelectedCategory('Shoes')}>Sapatos</button>
                        <button onClick={() => setSelectedCategory('Miscellaneous')}>Variados</button>
                    </div>
                    <div className="sort-filter">
                        <button onClick={() => setSortOrder('asc')}>Ordenar A-Z</button>
                        <button onClick={() => setSortOrder('desc')}>Ordenar Z-A</button>
                    </div>
                    <div className="price-filter">
                        <input
                            type="number"
                            placeholder="Preço Mínimo"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Preço Máximo"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="product-list">
                    {currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <div key={product.id} className="product-item">
                                <img src={product.images[0]} alt={product.title} />
                                <div>
                                    <h2>{product.title}</h2>
                                    <p>Categoria: {translateCategory(product.category.name)}</p>
                                    <p>Preço: ${product.price}</p>
                                    <div className="button-container">
                                        <button className="edit-button" onClick={() => { setEditingProductId(product.id); setIsEditProductModalOpen(true); }}>
                                            Editar
                                        </button>
                                        <button className="delete-button" onClick={() => { handleProductDeleted(product.id); setIsDeleteModalOpen(true); }}>
                                            Excluir
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Não há produtos para exibir</p>
                    )}
                </div>
            </div>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </button>
                ))}
            </div>
            {isAddProductModalOpen && (
                <Modal onClose={() => setIsAddProductModalOpen(false)}>
                    <AddProduct 
                        onProductAdded={handleProductAdded} 
                        onClose={(prop) => setIsAddProductModalOpen(prop)}
                    />
                </Modal>
            )}
            {isEditProductModalOpen && (
                <Modal onClose={() => setIsEditProductModalOpen(false)}>
                    <EditProduct 
                        productId={editingProductId} 
                        onProductUpdated={handleProductUpdated} 
                        onCancel={() => { setEditingProductId(null); setIsEditProductModalOpen(false); }}
                        onClose={(prop) => setIsEditProductModalOpen(prop)}
                    />
                </Modal>
            )}
            {isDeleteProductModalOpen && (
                <Modal onClose={() => setIsDeleteModalOpen(false)}>
                    <DeleteProduct
                        productId={editingProductId} 
                        onClose={(prop) => setIsDeleteModalOpen(prop)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Home;
