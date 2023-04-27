import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Utils/Api";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { Product } from "../../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { getLike } from "../../Utils/utils";
import { fetchChangeProductLike } from "../../storageToolKit/products/productSlice";

export const ProductPage = () => {
  const id = useParams();
  const [product, setProduct] = useState(null);
  const currentUser = useSelector((s) => s.user.data);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  // Это функция из дочернего компонента Product.jsx которая вызывает функцию handleProductLike в App.jsx и
  // обновляет текущий продукт через удаление или добавление айди текущего юзера (currentUser._id)
  // Если handleProductLike нам возвращает true , это значит, что товар был лайкнут до изменения.
  // Если он был лайкнут до изменения, значит было совершено действие по его удалению, значит нам надо удалить лайк из массива лайков этого продукта
  // Если он не был лайкнут до изменения  , значит было совершено действие по его добавлению. Значит нам надо добавить лайк(добавить айди текущего юзера) в массив лайков
  // этого продукта

  const onProductLike = () => {
    // const wasLiked = handleProductLike(product);
    const wasLiked = getLike(product, currentUser);
    dispatch(fetchChangeProductLike(product));
    if (wasLiked) {
      const filteredLikes = product.likes.filter((e) => e !== currentUser._id);
      setProduct({ ...product, likes: filteredLikes });
    } else {
      const addedLikes = [...product.likes, currentUser._id];
      setProduct({ ...product, likes: addedLikes });
    }
  };

  const onSendReview = (newProduct) => {
    setProduct(() => ({
      ...newProduct,
    }));
  };
  const deleteReview = async (id) => {
    const result = await api.deleteReview(product._id, id);
    setProduct((state) => ({
      ...result,
    }));
    return result;
  };

  useEffect(() => {
    if (!id?.productId) {
      return;
    }
    api.getProductById(id?.productId).then((data) => setProduct(data));
  }, [id?.productId]);

  useEffect(() => {
    if (product?.reviews && Array.isArray(product?.reviews)) {
      setReviews(() => [
        ...product.reviews?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.crea)
        ),
      ]);
    }
  }, [product]);

  return (
    <>
      {product && currentUser ? (
        <Product
          product={product}
          reviews={reviews}
          onDeleteReview={deleteReview}
          onSendReview={onSendReview}
          id={id.productId}
          onProductLike={onProductLike}
        />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
