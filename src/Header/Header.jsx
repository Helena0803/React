import { Search } from "../Search/Search";
import "./style.css";
import { ReactComponent } from "./images/Cart.svg";
import { ReactComponent as Reg } from "./images/login.svg";
import IconBasket from "../Card/Basket";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

export const Header = () => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter } =
    useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);

  console.log({ currentUser });

  // const handleClick = () => {
  //   setState((st) => !st);
  // };
  useEffect(() => {
    setCounter((st) => st + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <div className="logo">
              <img
                src="http://new15955757526555.myaddshop.ru/img/250x0/1068/logo/bez-imeni-1_15955806957754.png"
                alt="Версаль"
              ></img>
            </div>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="header__center__menu">
            <span>
              <a href="/ sales /" className="Акции">
                {" "}
                Акции{" "}
              </a>
              <a href="/ o-kompanii /" className="О компании">
                {" "}
                О компании{" "}
              </a>
              <a href="/ dostavka-i-oplata /" className="Доставка и оплата">
                {" "}
                Доставка и оплата{" "}
              </a>
              <a href="/ news /" className="Новости">
                {" "}
                Новости{" "}
              </a>
              <a href="/ kontakty /" className="Контакты">
                {" "}
                Контакты{" "}
              </a>
            </span>
          </div>
          <div className="header__right">
            <div className="phone" title="Позвонить">
              <a href="tel:+78126663311">+7(812)666-33-11</a>
            </div>
            <div>
              <a href="/basket/"></a>
              <ReactComponent
                className="basket bar-btn"
                title="Корзина товаров"
              />
            </div>
            <div>
              <a href="/login/"></a>
              <Reg
                className="login_or_reg bar-btn"
                title="Вход и регистрация"
              />
              <IconBasket count={counter} />
            </div>
          </div>
          <div>
            <span>{currentUser.name}</span>
            <span>{currentUser.about}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
