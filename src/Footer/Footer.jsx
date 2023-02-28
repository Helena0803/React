import "./style.css";

export const Footer = () => {
  return (
    <div className="footer__container">
      <div className="inner">
        <div className="left_menu">
          <div className="logo_wrapper">
            <a className="logo" href="/">
              <img
                src="http://new15955757526555.myaddshop.ru/img/250x0/1068/logo/bez-imeni-1_15955806957754.png"
                alt="Версаль"
              />
            </a>
          </div>
          <div className="copyright">© 2023 Версаль</div>
          <a class="policy" href="/politika-konfidencialnosti/">
            Политика конфиденциальности
          </a>
          <a
            class="user_agreement_link"
            href="/soglasie-na-obrabotku-personalnyh-dannyh/"
          >
            {" "}
            Согласие на обработку персональных данных
          </a>
        </div>
        <div className="about_shop">
          <div className="footer_subtitle">О магазине</div>
          <ul>
            <li>
              <a href="/">Главная</a>
            </li>
            <li>
              <a href="/sales/">Акции</a>
            </li>
            <li>
              <a href="/o-kompanii/">О компании</a>
            </li>
            <li>
              <a href="/dostavka-i-oplata/">Доставка и оплата</a>
            </li>
            <li>
              <a href="/kontakty/">Контакты</a>
            </li>
            <li>
              <a href="/news/" className="" title="Новости">
                Новости
              </a>
            </li>
            <li>
              <a href="/articles/" className="" title="Статьи">
                Статьи
              </a>
            </li>
          </ul>
        </div>
        <div className="catalog_shop">
          <div class="footer_subtitle">Каталог</div>
          <ul>
            <li>
              <a
                href="/categories/obychnye-bukety/"
                className=""
                title="Обычные букеты"
              >
                Обычные букеты
              </a>
            </li>
            <li>
              <a
                href="/categories/prazdnichnye-bukety/"
                className=""
                title="Праздничные букеты"
              >
                Праздничные букеты
              </a>
            </li>
            <li>
              <a
                href="/categories/svadebnye-bukety/"
                className=""
                title="Свадебные букеты"
              >
                Свадебные букеты
              </a>
            </li>
            <li>
              <a href="/categories/monobukety/" className="" title="Монобукеты">
                Монобукеты
              </a>
            </li>
            <li>
              <a
                href="/categories/personalnye-bukety/"
                className=""
                title="Персональные букеты"
              >
                Персональные букеты
              </a>
            </li>
          </ul>
        </div>
        <div className="contacts">
          <div className="footer_subtitle">Свяжитесь с нами</div>
          <div className="address">
            195000, г.Санкт-Петербург, Садовая ул., дом 5 стр. 5
          </div>
          <div>
            <span className="mail_span">E-mail:</span>
            <a href="mailto:support@versal.com">support@versal.com</a>
          </div>
          <a className="footer_phone" href="tel:+78126663311">
            +7(812)666-33-11
          </a>
        </div>
      </div>
    </div>
  );
};
