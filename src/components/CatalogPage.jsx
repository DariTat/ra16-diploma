import { Catalog } from "./Catalog"
import banner from '../img/banner.jpg';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchItemsCatalog } from "../redux/slice/catalogListSlice";


export const CatalogPage = () => {
    const { search } = useSelector(state => state.catalogList)
    const [valueSearch, setValue] = useState(search);
    const dispatch = useDispatch();
     
    useEffect(() => {
        dispatch(searchItemsCatalog(valueSearch));
    }, []);


    const handleChange = (event) => {
        const { value } = event.target;
        setValue(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchItemsCatalog(valueSearch));
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
                        <section className="catalog">
                            <h2 className="text-center">Каталог</h2>
                            <form className="catalog-search-form form-inline" onSubmit={handleSearch}>
                                <input className="form-control" value={valueSearch} onChange={handleChange} placeholder="Поиск"/>
                            </form>
                            <Catalog/>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}