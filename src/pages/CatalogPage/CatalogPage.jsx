import { useContext } from "react";
import { getIssues } from "../../App/utils/utils";
import { CardFlower } from "../../CardFlower/CardFlower";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import "./style.css";

export const CatalogPage = ({ parentCounter }) => {
  const { cards } = useContext(CardContext);
  const { searchQuery, setSort } = useContext(UserContext);

  const sortedItems = [
    { id: "Популярные" },
    { id: "Свадебные" },
    { id: "Обычные" },
    { id: "Новинки" },
  ];

  return (
    <>
      {searchQuery && (
        <p>
          По запросу {searchQuery} найдено {cards?.length}
          {getIssues(cards.length)}
        </p>
      )}
      <div className="sort-cards">
        {sortedItems.map((e) => (
          <span key={e.id} className="sort-item" onClick={() => setSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      <CardFlower cards={cards} parentCounter={parentCounter} />
    </>
  );
};
