import React, { useEffect, useState } from "react";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const getData = async () => {
    try {
      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
        // "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
      );
      const data = await api.json();

      setPopular(data.categories.slice(0, 8));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Popular</h1>
      {popular.map((items) => {
        return (
          <div key={items.idCategory}>
            <h2>{items.strCategory}</h2>
            <img src={items.strCategoryThumb} alt="img" />
            <p>{items.strCategoryDescription}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Popular;
