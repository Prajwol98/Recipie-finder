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
        console.log(data);
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
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            gap: "1rem",
            pagination: false,
            autoplay: true,
            drag: "free",
            pagination: true,
          }}
        >
          {/* {popular.map((items) => {
            return (
              <SplideSlide key={items.idCategory}>
                <div className="min-h-[15rem] relative">
                  <h2 className="absolute z-10 bottom-0 left-0 text-white bg-gradient-to-t from-black/50 w-full p-2">
                    {items.strCategory}
                  </h2>
                  <img
                    className="rounded-lg absolute left-0 w-full h-full object-cover"
                    src={items.strCategoryThumb}
                    alt={items.strCategory}
                    ø
                  />
                </div>
              </SplideSlide>
            );
          })} */}

          {popular.map((items) => {
            return (
              <SplideSlide key={items.idCategory}>
                <div>
                  <h2>{items.strCategory}</h2>
                  <img
                    src={items.strCategoryThumb}
                    alt={items.strCategoryThumb}
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
