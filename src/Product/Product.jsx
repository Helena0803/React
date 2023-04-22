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
import { Form } from "../Form/Form";
import { useForm } from "react-hook-form";
import { CardContext } from "../context/cardContext";
import { BaseButton } from "../BaseButton/BaseBatton";
import { ReactComponent as Basket } from "./img/basket.svg";
import { openNotification } from "../Notification/Notification";
import { useSelector } from "react-redux";

export const Product = ({
  id,
  product,
  reviews,
  onSendReview,
  onProductLike,
  onDeleteReview,
}) => {
  const [rate, setRate] = useState(3);
  const navigate = useNavigate();
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(reviews?.slice(0, 2));
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const currentUser = useSelector((s) => s.user.data);

  // const isLiked = getLike(product, currentUser);
  const isLiked = product?.likes?.some((e) => e === currentUser._id);
  const [isLikedProduct, setIsLikedProduct] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const sendReview = async (data) => {
    try {
      const newProduct = await api.addReview(product._id, {
        text: data.review,
        rating: rate,
      });
      onSendReview(newProduct);
      // setReviewsProduct((state) => [...newProduct.reviews]);
      setShowForm(false);
      reset();
      openNotification("success", "Успешно", "Ваш отзыв успешно добавлен");
    } catch (error) {
      openNotification("error", "error", "Ваш отзыв не был добавлен");
    }
  };

  // useEffect(()=> {
  //   if (JSON.stringify(product) === '{}') return;
  //   const isLiked = product?.likes?.some((el) => el === currentUser._id);
  //   setLiked(isLiked);
  // },[product]);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const onLike = (e) => {
    onProductLike(product);
  };

  const textRegister = register("review", {
    required: "Review обязателен",
  });

  const deleteReview = async (id) => {
    // setReviewsProduct(() => [...res.reviews]);
    try {
      const res = await onDeleteReview(id);
      openNotification("success", "Успешно", "Ваш отзыв удален");
    } catch (error) {
      openNotification("error", "Ошибка", "Ваш отзыв не получилось удалить");
    }
  };

  const hideReviews = () => {
    setReviewsProduct(() => [...reviews.slice(0, 2)]);
  };
  const showMore = () => {
    setReviewsProduct((state) => [...reviews.slice(0, state.length + 2)]);
  };
  useEffect(() => {
    setReviewsProduct(() => reviews);
  }, [reviews]);

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
  // console.log({ currentRating });

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);
  // console.log(users);
  const getUser = (id) => {
    if (!users.length) return "User";
    const user = users.find((e) => e._id === id);
    if (user?.avatar.includes("default-image")) {
      return {
        ...user,
        avatar:
          "https://yandex.ru/images/search?p=1&text=love+image&pos=38&rpt=simage&img_url=http%3A%2F%2Frare-gallery.com%2Fuploads%2Fposts%2F104892-love-image-heart-grass-5k.jpg&from=tabbar&lr=2",
      };
    }
    return user;
  };
  useEffect(() => {
    const isLiked = product?.likes?.some((e) => e === currentUser._id);
    setIsLikedProduct(isLiked);
  }, [product.likes, currentUser._id]);

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
            <Rating rate={currentRating} setRate={() => {}} />
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
          <button
            className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })}
            onClick={(e) => onLike(e)}
          >
            <Save />
            <span>{isLikedProduct ? "В избранном" : "В избранное"}</span>
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
      <div className={s.review__wrapper}>
        <button className="btn" onClick={() => setShowForm(true)}>
          Добавить отзыв
        </button>
        {showForm && (
          <Form
            className={s.review__form}
            submitForm={handleSubmit(sendReview)}
          >
            <Rating rate={rate} isEditable={true} setRate={setRate} />
            <span>Оставьте ваш отзыв</span>
            <textarea
              placeholder="Ваш отзыв"
              className={s.review__form__text}
              {...textRegister}
            />
            <BaseButton style={{ width: "200px" }} color={"pink"} type="submit">
              Отправить отзыв
            </BaseButton>
          </Form>
        )}
        <div className={s.review__show_more}>
          <span onClick={showMore}>Еще отзывы</span>
          <span onClick={hideReviews}>Скрыть отзывы</span>
        </div>
      </div>
      {users &&
        reviewsProduct
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((r) => (
            <div key={r._id} className={s.review}>
              <div className={s.review__author}>
                <div className={s.review__info}>
                  <img
                    className={s.review__avatar}
                    src={getUser(r.author)?.avatar}
                    alt="avatar"
                  />
                  <span>{getUser(r.author)?.name ?? "User"}</span>
                  <span className={s.review__date}>
                    {new Date(r.created_at)
                      .toLocaleString("ru", options)
                      .slice(0, -2)}
                  </span>
                </div>
                <Rating rate={r.rating} isEditable={false} />
              </div>
              <div className={s.text}>
                <span>{r.text}</span>
                {currentUser._id === r.author && (
                  <Basket
                    onClick={() => deleteReview(r._id)}
                    className={s.text__img}
                  />
                )}
              </div>
            </div>
          ))}
    </>
  );
};
