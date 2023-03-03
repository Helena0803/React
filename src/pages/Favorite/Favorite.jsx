import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardFlower } from "../../CardFlower/CardFlower";
import { CardContext } from "../../context/cardContext";
import "./index.css";

export const Favorite = () => {
  const { favorite } = useContext(CardContext);
  const navigate = useNavigate();

  return (
    <div className="favorite">
      <span className="favorite__back" onClick={() => navigate(-1)}>
        {"< "}Назад
      </span>
      <h1>Избранное</h1>
      {!!favorite.length ? (
        <CardFlower cards={favorite} />
      ) : (
        <div className="block_main">Вы еще ничего не добавили в избранное</div>
      )}
    </div>
  );
};
