import { NavLink} from "react-router-dom"

export const Cart = ({item}) => {

    return (
        <div className="col-4" key={item.id}>
            <div className="card">
                <img src={item.images[0]}
                className="card-img-top img-fluid" alt="Босоножки 'MYER'"/>
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price}</p>
                    <NavLink to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
                </div>
            </div>
        </div>
    )
}