import { Search } from "../Search/Search";
import "./style.css";
import { ReactComponent } from "./images/Cart.svg";
import { ReactComponent as Reg } from "./images/login.svg";
import IconBasket from "../Card/Basket";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Like } from "../Header/Path.svg";
import { ReactComponent as Logout } from "../Header/logout.svg";
import { ReactComponent as AddFlower } from "../Header/images/profile.svg";
import { ReactComponent as Charts } from "../Header/images/charts.svg";
import { useSelector } from "react-redux";
import { Modal } from "../Modal/Modal";
import { AddProduct } from "../AddProduct/AddProduct";

export const Header = ({ setShowModal, activeModal }) => {
  const { searchQuery, setSearchQuery, parentCounter, isAuthentificated } =
    useContext(UserContext);

  const [counter, setCounter] = useState(parentCounter);
  const [isCreateModalActive, setCreateModal] = useState(false);
  // const { favorite } = useContext(CardContext);
  const { favorites } = useSelector((s) => s.products);
  const navigate = useNavigate();

  useEffect(() => {
    setCounter((st) => st + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <div className="logo" onClick={() => navigate("/catalog")}>
              <img
                src="http://new15955757526555.myaddshop.ru/img/250x0/1068/logo/bez-imeni-1_15955806957754.png"
                alt="Версаль"
              ></img>
            </div>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="header__center__menu">
            <span>
              <a href="/" className="Акции">
                {" "}
                Акции{" "}
              </a>
              <a href="/" className="О компании">
                {" "}
                О компании{" "}
              </a>
              <a href="/" className="Доставка и оплата">
                {" "}
                Доставка и оплата{" "}
              </a>
              <a href="/" className="Контакты">
                {" "}
                Контакты{" "}
              </a>
            </span>
          </div>
          <div className="header__right">
            <div className="phone" title="Позвонить">
              <a href="tel:+78126663311">+7(812)666-33-11</a>
            </div>
            <div className="favor">
              {/* <div>
                <a href="/basket/"></a>
                <ReactComponent
                  className="basket bar-btn"
                  title="Корзина товаров"
                />
              </div> */}
              <IconBasket count={counter} />

              <Link to={"/favorites"} className="header__bable-link">
                <Like className="card__liked" />
                {favorites.length !== 0 && (
                  <span className="header__bable">{favorites.length}</span>
                )}
              </Link>
            </div>
            <div className="login">
              {!isAuthentificated ? (
                <Link to={"login"} className="login_or_reg bar-btn">
                  <Reg>
                    {" "}
                    profile // className="login_or_reg bar-btn" // title="Вход и
                    регистрация" // onClick={() => setShowModal(true)}
                  </Reg>
                </Link>
              ) : (
                <Link
                  to={"/profile"}
                  className="header__link"
                  onClick={() => setShowModal(true)}
                >
                  <Reg />
                </Link>
              )}
            </div>
            <Link to={"/chart"} className="header__link">
              <Charts />
            </Link>
            <span onClick={() => setCreateModal(true)}>create</span>
            {isCreateModalActive && (
              <Modal
                activeModal={isCreateModalActive}
                setShowModal={setCreateModal}
              >
                <AddProduct setCreateModal={setCreateModal} />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
