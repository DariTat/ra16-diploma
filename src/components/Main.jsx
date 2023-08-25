import { useEffect } from 'react';
import banner from '../img/banner.jpg';
import { useSelector, useDispatch } from 'react-redux'
import { hitListRequest } from '../redux/slice/hitListSlice';
import { Preloader } from './Preloader';
import { Cart } from './Cart';
import { Catalog } from './Catalog';
import { catalogListRequest } from '../redux/slice/catalogListSlice';

export const Main = () => {
    const hitList = useSelector(state => state.hitList);
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(hitListRequest());
        dispatch(catalogListRequest());
    }, []);

    return(
        <>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={banner} className="img-fluid" alt="К весне готовы!"/>
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                        <section className="top-sales">
                            <h2 className="text-center">Хиты продаж!</h2>
                            { hitList.loading ? <Preloader/> : 
                                <div className="row">
                                    { hitList.items.map((item) => (
                                       <Cart item={item}/>
                                    ))}
                                </div>
                            }
                        </section>
                        <section className="catalog">
                            <h2 className="text-center">Каталог</h2>
                            <Catalog/>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}

