import React, { useEffect, useState, useCallback } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (item) => {
    setSelectedItem((prev) =>
      prev?.idCategory === item.idCategory ? null : item
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const checkLocalStorage = () => {
    const data = localStorage.getItem("popular");
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("popular", JSON.stringify(data));
  };

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const localData = checkLocalStorage();
      if (localData.length > 0) {
        setPopular(localData.slice(0, 8));
        setIsLoading(false);
        return;
      }

      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (!api.ok) {
        throw new Error("Something went wrong");
      }

      const data = await api.json();
      if (Array.isArray(data.categories)) {
        saveToLocalStorage(data.categories);
        setPopular(data.categories.slice(0, 8));
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

      <div className="md:flex">
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            gap: "1rem",
            autoplay: true,
            drag: "free",
            pagination: true,
            breakpoints: {
              640: { perPage: 2, gap: "0.5rem" },
              480: { perPage: 2, gap: "0.5rem" },
            },
          }}
        >
          {popular.map((item) => (
            <SplideSlide
              key={item.idCategory}
              onClick={() => handleClick(item)}
              className="cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden">
                <h2 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-black p-2 z-10 rounded-md">
                  {item.strCategory}
                </h2>
                <img
                  className="w-full h-64 object-cover"
                  src={item.strCategoryThumb}
                  alt={item.strCategory}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div
          id="default-modal"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">
                {selectedItem.strCategory}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:bg-gray-200 rounded-lg p-1"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              <p className="text-gray-500">
                Description of {selectedItem.strCategory}...
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 border-t">
              <button
                onClick={closeModal}
                className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popular;
