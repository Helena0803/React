import "./style.css";
import { Card } from "../Card/Card";
import { useContext } from "react";
import { CardContext } from "../context/cardContext";

export const CardFlower = ({ cards }) => {
  const { setParentCounter, handleProductLike } = useContext(CardContext);
  return (
    <div className="cards">
      {cards.map((item) => {
        // <Card picture={item.picture} />;
        return (
          <Card
            key={item.id}
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
            {...item}
          />
        );
      })}
    </div>
  );
};
