import { ReactComponent as Like } from './logoLike.svg';
import './style.css';

export const Card =({pictures, name, discount, price, setParentCounter, currentUser, onProductLike, product}) => {
    const isLiked = product.likes.some(el=>el===currentUser._id)
    const handelLikeClick = () => {
    onProductLike(product);
    };


    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
                <span className="card__discount">{discount}%</span>
                </div>
            <div className="card__sticky card__sticky_type_top-right">
                <button 
                className= {`card__favorite  ${isLiked ? 'card__favorite_active' : ''}`}
                onClick={handelLikeClick} >
                <Like className='card__liked'/>
                </button>
                </div>
               <a href="/" className="card__link">
                <img src={pictures} alt="card__image" className="card__image" />
                <div className="card__desc">
                    <span className="card__price">{price}p</span>
                    <span className="card__wight">1pc</span>
                    <p className="card__name">{name}</p>
                    </div>
                    </a>
                    <span
        onClick={() => setParentCounter((state) => state + 1)}
        className='card__card btn btn_type_primary'>В корзину
      </span>
        </div>
    );
};
