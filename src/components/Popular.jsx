// "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
import React, { useEffect, useState, useCallback } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
      <div className="flex ">
        {popular.map((items) => {
          return (
            <div key={items.idCategory}>
              <h2>{items.strCategory}</h2>
              <img
                className="w-[100%] h-[100%]  rounded-lg"
                src={items.strCategoryThumb}
                alt={items.strCategory}
              />
              {/* <p>{items.strCategoryDescription}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
