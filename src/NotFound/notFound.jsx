import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import Mistake from "./404.jpg";

export const PageNotFound = () => {
  return (
    <div className="block_main">
      <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
      <img src={Mistake} />
      <h3 style={{ width: 250, height: 40 }}>
        Простите, по вашему запросу ничего не найдено
      </h3>
      <p>
        <Link to="/catalog" button className="btn">
          На главную
        </Link>
      </p>
    </div>
  );
};
