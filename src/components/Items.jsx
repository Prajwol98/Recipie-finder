// "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
import React, { useEffect, useState, useCallback } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const checkLocalStorage = () => {
    const data = localStorage.getItem("items");
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("Items", JSON.stringify(data));
  };

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const localData = checkLocalStorage();
      if (localData.length > 0) {
        setItems(localData.slice(0, 8));
        setIsLoading(false);
        return;
      }
      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
      );
      if (!api.ok) {
        throw new Error("Something went wrong");
      }

      const data = await api.json();
      if (Array.isArray(data.categories)) {
        saveToLocalStorage(data.categories);
        setItems(data.categories.slice(0, 8));
        console.log(data);
      } else {
        console.error("Error fetching data:", data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <h1 className="font-bold text-2xl text-center">Trending</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading && <p className="text-center">Loading...</p>}
      <div className="md:flex ">
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            gap: "1rem",
            autoplay: true,
            drag: "free",
            pagination: true,
            breakpoints: {
              640: {
                perPage: 2,
                gap: "0.5rem",
              },
              480: {
                perPage: 2,
                gap: "0.5rem",
              },
            },
          }}
        >
          {items.map((items) => {
            return (
              <SplideSlide key={items.idMeal}>
                <div>
                  <h2 className=" absolute bottom-2 left-14 md:left-24  bg-black text-white rounded-md p-2 text-center z-10">
                    {items.strMeal}
                  </h2>
                  <img
                    className="relative"
                    src={items.strMealThumb}
                    // alt={items.strCategoryThumb}
                  />
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

export default Popular;
