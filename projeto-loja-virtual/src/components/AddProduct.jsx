// src/components/AddProduct.jsx
import React, { useEffect, useState } from 'react';
import { addProduct, getCategory} from '../services/api';
import './ProductStyle.css';

const categories = [
    { id: 1, name: 'Eletrônicos' },
    { id: 2, name: 'Roupas' },
    { id: 3, name: 'Móveis' },
    { id: 4, name: 'Sapatos' },
    { id: 5, name: 'Variados' }
];
const inicializeProduct = {
    title: '',
    price: '',
    categoryId: '',
    images: [],
    description: '',
}


const AddProduct = ({ onProductAdded, OnClose }) => {
    // const [productState, setProductState] = useState({
    //     title: '',
    //     price: '',
    //     categoryId: '',
    //     images: '',
    // });
    const [categoryState, setCategoryState] = useState([])
    
    const [productState, setProductState] = useState({
        ... inicializeProduct
    })

    useEffect(async () => {
        const fetchCategory = async () => {
            try {
                const response = await getCategory();
                console.log(response.data)
                setCategoryState([...response.data]);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };
        await fetchCategory()
    },[])

    const handleChangeData = (e) => {
        const { name, value, images } = e.target;
        console.log(e.target.name)
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
        console.log('nome',name, 'valor',value, 'imagem', images)
        
    };
    // const handleChangeData = (value, name ) => {
    //     console.log(name, value)
    //     setProductState((state) => ({ ...state, [name]: value }));
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        try {
            console.log(productState)
            if (productState){
                await addProduct(productState)
                OnClose(false)

            }
        //     // await addProduct(productData);
        //     // if (onProductAdded) onProductAdded();
        //     // setProductData({
        //     //     title: '',
        //     //     price: '',
        //     //     categoryId: '',
        //     //     images: '',
        //     });
        } catch (error) {
            console.log(error.message)
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
            <button type="submit" className="submit-button">Adicionar Produto</button>
        </form>
    );
};

export default AddProduct;
