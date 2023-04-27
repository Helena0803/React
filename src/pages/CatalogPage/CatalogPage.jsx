import { useContext } from "react";
import { getIssues } from "../../Utils/utils";
import { CardFlower } from "../../CardFlower/CardFlower";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { sortedProducts } from "../../storageToolKit/products/productSlice";

export const CatalogPage = ({ parentCounter }) => {
  const { cards } = useContext(CardContext);
  const { searchQuery } = useContext(UserContext);
  const dispatch = useDispatch();
  const products = useSelector((s) => s.products.data);

  const sortedItems = [
    { id: "Популярные" },
    { id: "Свадебные" },
    { id: "Обычные" },
    { id: "Новинки" },
  ];

  const handleSort = (target) => {
    dispatch(sortedProducts(target));
  };
  return (
    <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено {products?.length}
          {getIssues(cards.length)}
        </p>
      )}
      <div className="sort-cards">
        {sortedItems.map((e) => (
          <span
            key={e.id}
            className="sort-item"
            onClick={() => handleSort(e.id)}
          >
            {e.id}
          </span>
        ))}
      </div>
      <CardFlower cards={cards} parentCounter={parentCounter} />
    </>
  );
};
