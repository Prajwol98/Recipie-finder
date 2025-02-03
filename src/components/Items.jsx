import React, { useEffect, useState, useCallback } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Items = () => {
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
      if (Array.isArray(data.meals)) {
        saveToLocalStorage(data.meals);
        setItems(data.meals.slice(0, 8));
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
      <h1 className="font-bold text-2xl text-center">Trending Vegetarian</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading && <p className="text-center">Loading...</p>}
      <div className="md:flex ">
        <Splide
          options={{
            type: "loop",
            perPage: 4,
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
          {items.map((item) => {
            return (
              <SplideSlide key={item.idMeal}>
                <div className="relative rounded-lg overflow-hidden">
                  <h2 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/75 text-white rounded-md p-2 text-center z-10">
                    {item.strMeal}
                  </h2>
                  <img
                    className="w-full h-64 object-cover"
                    src={item.strMealThumb}
                    alt={item.strMeal}
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

export default Items;
