import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import truck from "../Product/img/truck.svg";
import quality from "../Product/img/quality.svg";
import { Footer } from "../Footer/Footer";
import "./App.css";
import { api } from "./utils/Api";
import { authApi } from "./utils/authApi";
import { getLike, useDebounce } from "./utils/utils";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { UserContext } from "../context/userContext";
import { CardContext } from "../context/cardContext";
import { PageNotFound } from "../pages/NotFound/notFound";
import { FaqPage } from "../pages/FAQ/FaqPage";
import { Favorite } from "../pages/Favorite/Favorite";
import { RegistrationForm } from "../Form/RegistrationForm";
import { Form } from "../Form/Form";
import { Modal } from "../Modal/Modal";
import { Login } from "../Auth/Login/Login";
import { Register } from "../Auth/Register/Register";
import { ResetPass } from "../Auth/ResetPassword/ResetPassword";
import { parseJwt } from "./utils/parseJWT";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorite, setFavorite] = useState([]);
  const [formData, setFormData] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  const filteredCards = (products, id) => {
    return products.filter((e) => e.author._id === id);
  };

  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filteredCards(data, currentUser._id)));
  };
  const debounceValueApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = getLike(product, currentUser);
    isLiked
      ? api.deleteLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          // setCards([...newCards]);
          setCards(filteredCards(newCards, currentUser._id));
          setFavorite((priority) =>
            priority.filter((priority) => priority._id !== newCard._id)
          );
        })
      : api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          // setCards([...newCards]);
          setCards(filteredCards(newCards, currentUser._id));
          setFavorite((priority) => [...priority, newCard]);
        });
  }
  //use-Effect-ы

  useEffect(() => {
    if (debounceValueApp === undefined) return;
    handleSearch(debounceValueApp);
  }, [debounceValueApp]);

  // useEffect(() => {
  //   // if (!searchQuery) return setCards(cards);
  //   handleSearch(searchQuery);
  // }, [searchQuery]);

  //Рендер товаров может зависеть от прав пользователя необходимо,чтобы данные приходили одновременно. Для этого используем Promise.all
  //первонач-ая загрузка карточек и данных юзера
  useEffect(() => {
    if (!isAuthentificated) {
      return;
    }
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        //сетим юзера
        setCurrentUser(userData);
        const sorted = filteredCards(productData.products, userData._id);
        //сетим карточки
        setCards([...sorted]);
        // получаем отлайканные нами карточки
        const favor = sorted.filter((e) => getLike(e, userData));
        //сетим их в избранное
        setFavorite(favor);
      }
    );
  }, [isAuthentificated]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const authPath = ["/reset-password", "/register"];
    const token = localStorage.getItem("token");
    const uncodedToken = parseJwt(token);
    console.log({ uncodedToken });
    if (uncodedToken?._id) {
      setIsAuthentificated(true);
    }
    // else if (!authPath.includes(location.pathname)) {
    //   navigate("/login");
    // }
  }, [navigate]);

  // useEffect(() => {
  //   api.getPostList().then((data) => setCards(data));
  //   //   getPostList().then((data) => setCards(data.posts));
  //   //   getUserInfo().then((data) => console.log(data));
  //   api.getUserInfo().then((data) => setCurrentUser(data));
  // }, []);
  const setSortCards = (sort) => {
    if (sort === "Свадебные") {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]);
    }
    if (sort === "Обычные") {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
    }
    if (sort === "Популярные") {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
    if (sort === "Новинки") {
      const newCards = cards.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setCards([...newCards]);
    }
  };

  const sendData = async (data) => {
    // setFormData((s) => [...s, data]);
    const result = await api.registerUser({ ...data, group: "group-10" });
    console.log({ result });
  };

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    searchQuery,
    setSearchQuery,
    setParentCounter,
    parentCounter,
    isAuthentificated,
  };
  const contextCardValue = {
    cards,
    setParentCounter,
    handleProductLike,
    favorite,
    setFavorite,
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
          {isAuthentificated ? (
            <main className="content container">
              <div className="triggers">
                <div className="trigger1">
                  <span>
                    <p>
                      <img src={truck} alt="truck" />
                      Бесплатная доставка заказа от 1000 руб
                    </p>
                  </span>
                </div>
                <div className="trigger2">
                  <span>
                    <p>
                      <img src={quality} alt="quality" />
                      Особые условия от 5 000 руб
                    </p>
                  </span>
                </div>
                <div className="trigger3">
                  <span>
                    <p>
                      <img src="https://fontawesome.com" />
                      <i className="fa-regular fa-wallet"></i>Наличный и
                      безналичный расчет
                    </p>
                  </span>
                </div>
              </div>
              <Routes>
                <Route path="/catalog" element={<CatalogPage />}></Route>
                <Route
                  path="/product/:productId"
                  element={<ProductPage />}
                ></Route>
                <Route path="faq" element={<FaqPage />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
                <Route path="favorite" element={<Favorite />}></Route>
                <Route
                  path="login"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      <Login setShowModal={setShowModal} />
                    </Modal>
                  }
                ></Route>
                <Route
                  path="register"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      <Register setShowModal={setShowModal} />
                    </Modal>
                  }
                ></Route>
                <Route
                  path="reset-password"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      <ResetPass setShowModal={setShowModal} />
                    </Modal>
                  }
                ></Route>
              </Routes>
            </main>
          ) : (
            <div className="not__auth">
              Пожалуйста, авторизуйтесь
              <Routes>
                <Route
                  path="login"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      <Login setShowModal={setShowModal} />
                    </Modal>
                  }
                ></Route>
                <Route
                  path="register"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      <Register setShowModal={setShowModal} />
                    </Modal>
                  }
                ></Route>
                <Route
                  path="reset-password"
                  element={
                    <Modal
                      activeModal={activeModal}
                      setShowModal={setShowModal}
                    >
                      <ResetPass setShowModal={setShowModal} />
                    </Modal>
                  }
                ></Route>
              </Routes>
            </div>
          )}
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
