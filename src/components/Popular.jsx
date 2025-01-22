// "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
import React, { useEffect, useState, useCallback } from "react";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (!api.ok) {
        throw new Error("Something went wrong");
      }

      const data = await api.json();
      if (Array.isArray(data.categories)) {
        setPopular(data.categories.slice(0, 8));
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (error) {
      setError(error.message);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

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
