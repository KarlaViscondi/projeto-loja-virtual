import React, { useEffect, useState } from 'react';
import { addProduct, getCategory} from '../services/api';
import '../styles/productStyle.css';

const inicializeProduct = {
    title: '',
    price: '',
    categoryId: '',
    images: [],
    description: '',
}

const AddProduct = ({ onClose }) => {
    const [categoryState, setCategoryState] = useState([])
    const [successMessage, setSuccessMessage] = useState([])
    const [productState, setProductState] = useState({
        ... inicializeProduct
    })

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategory();
                setCategoryState([...response.data]);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };
        fetchCategory();
    }, []); 
    
    const handleChangeData = (e) => {
        const { name, value, images } = e.target;
        if (e.target.name === "images"){
            setProductState( (prevValues)=>({
                ...prevValues,
                [name]: [...prevValues.images, value],
            }));
        } else {
            setProductState( (prevValues)=>({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productState){
                await addProduct(productState);
                setSuccessMessage('Produto adicionado com sucesso!');
                setTimeout(() => {
                    setSuccessMessage('');
                    if (onClose) onClose(false);
                }, 1000); 
            }
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    placeholder="Nome"
                    value={productState.title}
                    onChange={handleChangeData}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={productState.description}
                    onChange={handleChangeData}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={productState.price}
                    onChange={handleChangeData}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="images"
                    placeholder="URL da Imagem"
                    value={productState.images}
                    onChange={handleChangeData}
                />
            </div>
            <div className="form-group">
                <label htmlFor="categoryId">Categoria:</label>
                <select
                    name="categoryId"
                    value={productState.categoryId}
                    onChange={handleChangeData}
                    required
                >
                    <option value="">Selecione a categoria</option>
                    {!categoryState || categoryState.map(category => (
                        <option key={category?.id} value={category?.id}>
                            {category?.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="submit-button" >Adicionar Produto</button>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
};

export default AddProduct;
