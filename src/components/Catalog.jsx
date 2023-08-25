import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Preloader } from './Preloader';
import { categoriesChange, categoriesListRequest } from '../redux/slice/categoriesSlice';
import { getMore } from '../redux/slice/catalogListSlice';
import { Cart } from './Cart';
import { Error } from './Error';

export const Catalog = () => {
    const { itemCategories, loadingCategories, errorCategories, categorieActive } = useSelector(state => state.categoriesList);
    const { itemCatalog, loadingCatalog, errorCatalog, itemLength } = useSelector(state => state.catalogList);
    const dispatch = useDispatch(); 

    console.log(itemCatalog)
    useEffect(() => {
        dispatch(categoriesListRequest());
    }, [dispatch]);

    const handleChange = (id, e) => {
        e.preventDefault();
        dispatch(categoriesChange(id));
    }
    
    const handleGetMoreItems = () => {
        dispatch(getMore(categorieActive));
    }

    return (
        <>
            {loadingCategories ? <Preloader/> : <ul className="catalog-categories nav justify-content-center">
                {itemCategories.map(categorie => {
                    return(
                        <li className="nav-item" id={categorie.id}>
                            <a className={categorie.id === categorieActive ? 'nav-link active': 'nav-link'} to="#" onClick={(e) => handleChange(categorie.id, e)}>{categorie.title}</a>
                        </li>
                    )
                })}
            </ul>}
            {errorCategories || errorCatalog && <Error/>}
            {loadingCatalog ? <Preloader/> : <div className='row'>
                {itemCatalog.map(item => (
                    <Cart item={item}/>
                ))}
            </div>}
            {itemLength > 5 && <div className="text-center">
                <button className="btn btn-outline-primary" onClick={handleGetMoreItems} disabled={loadingCatalog}>Загрузить ещё</button>
             </div>}
        </>
    )
}