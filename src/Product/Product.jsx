import s from "./index.module.scss";
import truck from "./img/truck.svg";
import cn from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import { useEffect, useState, useContext } from "react";
import { api } from "../App/utils/Api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { getLike } from "../App/utils/utils";
import { Rating } from "../Rating/Rating";

export const Product = ({ id, product }) => {
  const [rate, setRate] = useState(3);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState([
    product.reviews.slice(0, 5) ?? [],
  ]);
  const [users, setUsers] = useState([]);

  const isLiked = getLike(product, currentUser);
  // const [liked, setLiked] = useState(false);

  // useEffect(()=> {
  //   if (JSON.stringify(product) === '{}') return;
  //   const isLiked = product?.likes?.some((el) => el === currentUser._id);
  //   setLiked(isLiked);
  // },[product]);
  useEffect(() => {
    if (!product.reviews) return;
    const rateAcc = product.reviews.reduce(
      (acc, el) => (acc = acc + el.rating),
      0
    );

    const accum = Math.floor(rateAcc / product.reviews.length);
    setRate(accum);
    setCurrentRating(accum);
  }, [product?.reviews]);
  console.log({ currentRating });

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);
  console.log(users);
  const getUser = (id) => {
    if (!users.length) return "User";
    const user = users.find((e) => e._id === id);
    return user?.name ?? "Us";
  };

  const options = {
    date: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <span className={s.backtoCatalog} onClick={() => navigate(-1)}>
            {"< "}Назад
          </span>
          <h2>{product.name}</h2>
          <div className={s.rateInfo}>
            <span>
              Art <b>2644554</b>
            </span>
            <Rating
              rate={rate}
              setRate={setRate}
              currentRating={currentRating}
            />
            <span>{product?.reviews?.length} отзывов</span>
          </div>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {product.tags?.map((e) => (
            <span className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>
        <div className={s.desc}>
          <span className={s.price}>{product.price}&nbsp;₽</span>
          <span className={`${s.price} card__price_type_discount`}>
            15&nbsp;%
          </span>
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <button
              className={`btn btn_type_primary ${s.cart}`}
              onClick={() => navigate("/product/63ef72cf3aa285034f78ab5b")}
            >
              В корзину
            </button>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLiked })}>
            <Save />
            <span>{isLiked ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по Санкт-Петербургу!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 500 ₽</span>
              </p>
            </div>
          </div>
        </div>
        <div className={s.box}>
          <h2 className={s.title}>Описание</h2>
          <div>
            Пышный красивый букет из красных роз, который поднимет настроение
            любой женщине. Оформляем букет на заказ.
          </div>
          <h2 className={s.title}>Характеристики</h2>
          <div className={s.grid}>
            <div className={s.naming}>Единица измерения</div>
            <div className={s.description}>шт.</div>
            <div className={s.naming}>Количество цветов</div>
            <div className={s.description}>10-20 шт.</div>
            <div className={s.naming}>Комплектация </div>
            <div className={s.description}>
              Лента
              <p>
                Букеты дарят любимым женщинам по различным поводам: от дня
                рождения, юбилея или 8 марта до годовщины свадьбы и рождения
                ребенка. Также цветы дарят и без повода, чтобы поднять
                настроение.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {users &&
          reviewsProduct.map((r) => (
            <div key={r._id} className={s.review}>
              <div className={s.review__author}>
                <div>
                  <span>{getUser(r.author)}</span>
                  <span className={s.review__date}>
                    {new Date(r.created_at).toLocaleString("ru", options)}
                  </span>
                </div>
                <Rating rate={r.rating} isEditable={false} />
              </div>
              <div className={s.text}>
                <span>{r.text}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
