import { useDispatch, useSelector } from 'react-redux';
import banner from '../img/banner.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { searchItem } from '../redux/slice/catalogListSlice';
import { Preloader } from './Preloader';
import { addProduct } from './BasketStorage';


export const CartPage = () => {
    const { item, loadingCatalog, errorCatalog } = useSelector(state => state.catalogList)
    const params = useParams();
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);
    const [selected, setSelect]= useState({selectedSize: false, size: ''});
    const navigate = useNavigate();

    useEffect(() => {
       dispatch(searchItem(Number(params.id)))
    },[])

    const handleChange = (value) => {
        const changeAmount = amount + value;
        if (changeAmount > 0 && changeAmount <= 10) {
            setAmount(changeAmount);
        }
    }

    const handleSelected = (size) => {
        setSelect(() => ({
            selectedSize: !selected.selectedSize,
            size: !selected.selectedSize ? size : ''
        }))
    }
    const handleAddBasket = () => {
        if (!selected.size) {
            return
        }
        const product = {
            title: item.title,
            size: selected.size,
            price: item.price,
            id: item.id,
            amount
        }
        addProduct(product);
        navigate('/cart');
    }

    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={banner} className="img-fluid" alt="К весне готовы!"/>
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                        {errorCatalog && <Error/>}
                        {loadingCatalog ? <Preloader/> : 
                            <section className="catalog-item">
                                <h2 className="text-center">{item?.title}</h2>
                                <div className="row">
                                    <div className="col-5">
                                        <img src={item?.images[0]} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="col-7">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td>Артикул</td>
                                                    <td>{item?.sku}</td>
                                                </tr>
                                                <tr>
                                                    <td>Производитель</td>
                                                    <td>{item?.manufacturer}</td>
                                                </tr>
                                                <tr>
                                                    <td>Цвет</td>
                                                    <td>{item?.color}</td>
                                                </tr>
                                                <tr>
                                                    <td>Материалы</td>
                                                    <td>{item?.material}</td>
                                                </tr>
                                                <tr>
                                                    <td>Сезон</td>
                                                    <td>{item?.season}</td>
                                                </tr>
                                                <tr>
                                                    <td>Повод</td>
                                                    <td>{item?.reason}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-center">
                                            <p>Размеры в наличии: 
                                                {item?.sizes.map(size => {
                                                    if(size.available) {
                                                        return (
                                                            <span className={selected.selectedSize ? "catalog-item-size selected" : "catalog-item-size"} onClick={()=> handleSelected(size.size)}>{size.size}</span>
                                                        )
                                                    }
                                                })}
                                            </p>
                                            { (item?.sizes[0].available === true || item?.sizes[1].available === true) ?                         
                                                <p>Количество: 
                                                    <span className="btn-group btn-group-sm pl-2">
                                                        <button className="btn btn-secondary" onClick={() => handleChange(-1)}>-</button>
                                                        <span className="btn btn-outline-primary">{amount}</span>
                                                        <button className="btn btn-secondary" onClick={() => handleChange(1)}>+</button>
                                                    </span>
                                                </p>  
                                            : <></>}
                                        </div>
                                        {(item?.sizes[0].available === true || item?.sizes[1].available === true) ?
                                            <button className="btn btn-danger btn-block btn-lg" onClick={handleAddBasket}>В корзину</button>
                                            : <></>
                                        }
                                        
                                    </div>
                                </div>
                            </section>                   
                        }
                    </div>
                </div>
            </main>
        </>
    )
}