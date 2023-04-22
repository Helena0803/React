import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardFlower } from "../../CardFlower/CardFlower";
import "./index.css";
import { useSelector } from "react-redux";

export const Favorite = () => {
  const { favorites } = useSelector((s) => s.products);
  const navigate = useNavigate();

  return (
    <div className="favorite">
      <span className="favorite__back" onClick={() => navigate(-1)}>
        {"< "}Назад
      </span>
      <h1>Избранное</h1>
      {!!favorites.length ? (
        <CardFlower cards={favorites} />
      ) : (
        <div className="block_main">Вы еще ничего не добавили в избранное</div>
      )}
    </div>
  );
};
