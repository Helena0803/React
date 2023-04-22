import cn from "classnames";
import s from "./index.module.css";
import { useCallback, useEffect, useState } from "react";
import { ReactComponent as Rate } from "./Rate.svg";

export const Rating = ({
  rate,
  setRate,
  currentRating,
  isEditable = false,
}) => {
  //создаем пустые реакт-фрагменты, чтобы потом положить в них svg
  const emptyFragments = new Array(5).fill(<></>);
  const [ratingArr, setRatingArr] = useState(emptyFragments);

  const changeDisplay = (rate) => {
    // setRate(rate);
    if (!isEditable) return;
    constructRating(rate);
  };
  const changeRating = (r) => {
    if (!isEditable) return;
    setRate(r);
  };

  const constructRating = useCallback(
    (rating) => {
      const updatedArray = ratingArr.map((ratingEl, index) => (
        <Rate
          className={cn(s.rate, {
            [s.filled]: index < rating,
            [s.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(index + 1)}
          onMouseLeave={() => changeDisplay(rate)}
          onClick={() => changeRating(index + 1)}
        />
      ));
      setRatingArr(updatedArray);
    },
    [isEditable, rate]
  );
  useEffect(() => {
    constructRating(rate);
  }, [constructRating]);

  return (
    <>
      <div>
        {ratingArr.map((e, i) => (
          <span key={i}>{e}</span>
        ))}
      </div>
    </>
  );
};
