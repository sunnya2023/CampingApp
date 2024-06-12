import React from "react";
import "../style/categories.scss";
import { Link } from "react-router-dom";
import { categories } from "../data";

const Categories = () => {
  return (
    <div className="category">
      <h1>Explor top Categories</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis qui
        voluptate repellendus quaerat fugiat soluta ratione quia a labore illum?
      </p>

      {categories?.slice(1, 7).map((category, index) => (
        <div className="content" key={index}>
          <Link to="/">
            <div className="category-img">
              <img src={category.img} alt={category.label} />
            </div>
            <div className="overlay"></div>
            <div className="text">
              <div>{category.icon}</div>
              <p>{category.label}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
