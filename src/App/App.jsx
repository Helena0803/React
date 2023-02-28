import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import truck from "../Product/img/truck.svg";
import quality from "../Product/img/quality.svg";
import { Footer } from "../Footer/Footer";
import "./App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "./utils/Api";
import { useDebounce } from "./utils/utils";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { UserContext } from "../context/userContext";
import { CardContext } from "../context/cardContext";
import { PageNotFound } from "../NotFound/notFound";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const filteredCards = (products, id) =>
    products.filter((e) => e.author._id === id);

  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filteredCards(data, currentUser._id)));
  };
  const debounceValueApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = product.likes.some((el) => el === currentUser._id);
    console.log("product", product);
    isLiked
      ? api.deleteLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          // setCards([...newCards]);
          setCards(filteredCards(newCards, currentUser._id));
        })
      : api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          // setCards([...newCards]);
          setCards(filteredCards(newCards, currentUser._id));
        });
  }
  // const clickMe = async () => {
  //   await api.addNewProduct();
  // };

  // const clickMe = async () => {
  //   await api.deleteProduct("63ed335459b98b038f77b67c");
  // };

  useEffect(() => {
    if (debounceValueApp === undefined) return;
    handleSearch(debounceValueApp);
  }, [debounceValueApp]);

  useEffect(() => {
    // if (!searchQuery) return setCards(cards);
    handleSearch(searchQuery);
  }, [searchQuery]);

  //Рендер товаров может зависеть от прав пользователя необходимо,чтобы данные приходилиодновременно. Для этого используем Promise.all
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        setCards(filteredCards(productData.products, userData._id));
      }
    );
  }, []);
  const navigate = useNavigate();
  // console.log({ UserContext });

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

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    searchQuery,
    setSearchQuery,
    setParentCounter,
    parentCounter,
  };
  const contextCardValue = { cards, setParentCounter, handleProductLike };
  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header />
          <main className="content container">
            {/* <button onClick={() => clickMe()}>Нажми</button> */}

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
                  <p>Наличный и безналичный расчет</p>
                </span>
              </div>
            </div>
            <Routes>
              <Route path="/catalog" element={<CatalogPage />}></Route>
              <Route
                path="/product/:productId"
                element={<ProductPage />}
              ></Route>
              <Route
                path="*"
                element={<PageNotFound />}
                // <div>
                //   404 No found{" "}
                //   <button onClick={() => navigate("/")}>На главную</button>
                // </div>
              ></Route>
            </Routes>
          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
