import { memo } from "react";
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export const Footer = React.memo(() => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <div className="footer__column">
            <div className="logo_wrapper"></div>
            {/* <a className="logo" href="/"> */}
            <img
              src="http://new15955757526555.myaddshop.ru/img/250x0/1068/logo/bez-imeni-1_15955806957754.png"
              alt="Версаль"
            />
            {/* </a> */}

            <p className="copyright">© 2023 Версаль</p>
            <div>
              <a className="policy" href="/politika-konfidencialnosti/">
                Политика конфиденциальности
              </a>
            </div>
            <a
              href="/soglasie-na-obrabotku-personalnyh-dannyh/"
              className="user_agreement_link"
            >
              Согласие на обработку персональных данных
            </a>
          </div>
          <div className="footer__column">
            <nav className="about_shop_bottom">
              <a href="/" className="about_shop_bottom_item">
                О магазине
              </a>
              <Link to="/catalog" className="about_shop_bottom_item">
                Главная
              </Link>
              <a href="/sales/" className="about_shop_bottom_item">
                Акции
              </a>
              <a href="/o-kompanii/" className="about_shop_bottom_item">
                О компании
              </a>
              <a href="/dostavka-i-oplata/" className="about_shop_bottom_item">
                Доставка и оплата
              </a>
              <a href="/kontakty/" className="about_shop_bottom_item">
                Контакты
              </a>
              <a href="/news/" className="about_shop_bottom_item">
                Новости
              </a>
              <Link to="/faq" className="about_shop_bottom_item">
                Часто спрашивают
              </Link>
            </nav>
          </div>

          <div className="footer__column">
            <nav className="catalog_shop_bottom">
              <Link to="/catalog" className="catalog_shop_bottom_item">
                Каталог
              </Link>
              <a
                href="/categories/obychnye-bukety/"
                className="catalog_shop_bottom_item"
              >
                Обычные букеты
              </a>
              <a
                href="/categories/prazdnichnye-bukety/"
                className="catalog_shop_bottom_item"
              >
                Праздничные букеты
              </a>
              <a
                href="/categories/svadebnye-bukety/"
                className="catalog_shop_bottom_item"
              >
                Свадебные букеты
              </a>
              <a
                href="/categories/monobukety/"
                className="catalog_shop_bottom_item"
              >
                Монобукеты
              </a>
              <a
                href="/categories/personalnye-bukety/"
                className="catalog_shop_bottom_item"
              >
                Персональные букеты
              </a>
            </nav>
          </div>
          <div className="footer__column">
            <nav className="contacts_bottom">
              <a href="/" className="contacts_bottom_item">
                Свяжитесь с нами
              </a>
              <a href="/" className="contacts_bottom_item">
                195000, г.Санкт-Петербург, Садовая ул., дом 5 стр. 5
              </a>
              <div>
                <span className="contacts_bottom_item">E-mail:</span>
                <a href="mailto:support@versal.com">support@versal.com</a>
              </div>
              <a className="contacts_bottom_item" href="tel:+78126663311">
                +7(812)666-33-11
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
});
