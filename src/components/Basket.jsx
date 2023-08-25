import { useSelector, useDispatch } from 'react-redux';
import banner from '../img/banner.jpg';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteProduct, getProduct } from './BasketStorage';
import { basketProducts } from '../redux/slice/basketListSlice';
import { orderRequest } from '../redux/slice/orderSlice';
import { Preloader } from './Preloader';

export const Basket = () => {
    const { products } = useSelector(state => state.basketList);
    const { success, loading, error } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const [data, setData] = useState({'phone': '' , 'address': ''});
    const sum = products.reduce((sum, item) => sum + (item.price * item.amount), 0);
    

    useEffect(() => {
        const product = getProduct()
        dispatch(basketProducts(product));
    },[])

    const handleDelete = (idSize) => {
        const product = deleteProduct(idSize);
        dispatch(basketProducts(product));
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setData((prevData) => ({...prevData, [id]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (products.length === 0) {
            return
        }
        const order = {
            "owner": {
              "phone": data.phone,
              "address": data.address,
            },
            "items": products.map(product => (
              {
                "id": product.id,
                "price": product.price,
                "count": product.amount
              }
            )),
        }
        dispatch(orderRequest(order));
    }
    
    if (success) {
        localStorage.setItem('basket', JSON.stringify([]));
        return(
            <div className='order_success'>Заказ успешно оформлен</div>
        )
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
                    <section className="cart">
                        <h2 className="text-center">Корзина</h2>
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((item, index) => 
                            <tr>
                            <td scope="row">{index + 1}</td>
                            <td><NavLink  to={`/catalog/${item.id}`}>{item.title}</NavLink></td>
                            <td>{item.size}</td>
                            <td>{item.amount}</td>
                            <td>{item.price}</td>
                            <td>{item.amount * item.price}</td>
                            <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(`${item.id}${item.size}`)}>Удалить</button></td>
                            </tr>
                            
                        )}
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{sum}</td>
                            </tr>
                        </tbody>
                        </table>
                    </section>
                    {loading ? <Preloader/> : 
                    <section className="order">
                    <h2 className="text-center">Оформить заказ</h2>
                    <div className="card">
                        <form className="card-body">
                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input className="form-control" id="phone" value={data.phone} placeholder="Ваш телефон" onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Адрес доставки</label>
                                <input className="form-control" id="address" value={data.address} placeholder="Адрес доставки" onChange={handleChange}/>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="agreement" required/>
                                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                            </div>
                            <button type="submit" className="btn btn-outline-secondary" onClick={handleSubmit}>Оформить</button>
                        </form>
                    </div>
                </section>}
                    
                </div>
            </div>
        </main>
    </>
    )
}