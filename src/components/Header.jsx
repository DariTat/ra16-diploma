import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/header-logo.png';
import { useState } from "react";
import { searchItemsCatalog } from '../redux/slice/catalogListSlice';

export const Header = () => {
    const { products } = useSelector(state => state.basketList);
    const [valueSearch, setValue] = useState('');
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(value);
    }
    
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchItemsCatalog(valueSearch));
        setVisible(!visible);
        setValue('');
        navigate('./catalog');
    }


    return (
        <>
            <header className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-sm navbar-light bg-light">
                            <NavLink to='/'><img src={logo} alt="Bosa Noga"/></NavLink>
                            <div className="collapase navbar-collapse" id="navbarMain">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                    <NavLink to='/' className="nav-link">Главная</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <NavLink className="nav-link" to='/catalog' href="/catalog.html">Каталог</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <NavLink className="nav-link" to='/about' href="/about.html">О магазине</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <NavLink className="nav-link" to='/contacts' href="/contacts.html">Контакты</NavLink>
                                    </li>
                                </ul>
                                <div>
                                    <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={() => setVisible(!visible)}></div>
                                    
                                    <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')} >
                                        {!!products.length && <div className="header-controls-cart-full">{products.length}</div>}
                                        <div className="header-controls-cart-menu"></div>
                                    </div>
                                    </div>
                                    <form data-id="search-form" className={`header-controls-search-form form-inline ${visible && 'invisible'}`} onSubmit={handleSearch}>
                                        <input className="form-control" placeholder="Поиск" value={valueSearch}  onChange={handleChange}/>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}