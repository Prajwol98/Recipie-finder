// import React, { useEffect, useState, useCallback } from "react";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css";

// const Popular = () => {
//   const [popular, setPopular] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setIsLoading] = useState(true);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleClick = (item) => {
//     setSelectedItem((prev) =>
//       prev?.idCategory === item.idCategory ? null : item
//     );
//   };

//   const checkLocalStorage = () => {
//     const data = localStorage.getItem("popular");
//     return data ? JSON.parse(data) : [];
//   };

//   const saveToLocalStorage = (data) => {
//     localStorage.setItem("popular", JSON.stringify(data));
//   };

//   const getData = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const localData = checkLocalStorage();
//       if (localData.length > 0) {
//         setPopular(localData.slice(0, 8));
//         setIsLoading(false);
//         return;
//       }
//       const api = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/categories.php"
//       );
//       if (!api.ok) {
//         throw new Error("Something went wrong");
//       }

//       const data = await api.json();
//       if (Array.isArray(data.categories)) {
//         saveToLocalStorage(data.categories);
//         setPopular(data.categories.slice(0, 8));
//         console.log(data);
//       } else {
//         console.error("Error fetching data:", data);
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);
//   useEffect(() => {
//     getData();
//   }, [getData]);

//   return (
//     <div>
//       <h1 className="font-bold text-2xl text-center">Trending</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {loading && <p className="text-center">Loading...</p>}

//       <div className="md:flex ">
//         <Splide
//           options={{
//             type: "loop",
//             perPage: 3,
//             gap: "1rem",
//             autoplay: true,
//             drag: "free",
//             pagination: true,
//             breakpoints: {
//               640: {
//                 perPage: 2,
//                 gap: "0.5rem",
//               },
//               480: {
//                 perPage: 2,
//                 gap: "0.5rem",
//               },
//             },
//           }}
//         >
//           {popular.map((items) => {
//             return (
//               <SplideSlide
//                 key={items.idCategory}
//                 onClick={() => handleClick(items)}
//                 className={"cursor-pointer"}
//               >
//                 <div className="relative rounded-lg overflow-hidden ">
//                   <h2 className=" absolute bottom-2 left-1/2 transf0rm -translate-x-1/2 text-white bg-black  p-2 z-10 rounded-md">
//                     {items.strCategory}
//                   </h2>
//                   <img
//                     className="w-full h-64 object-cover"
//                     src={items.strCategoryThumb}
//                     alt={items.strCategoryThumb}
//                   />
//                 </div>
//                 {selectedItem && (
//                   <>
//                     <button
//                       data-modal-target="default-modal"
//                       data-modal-toggle="default-modal"
//                       className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                       type="button"
//                     >
//                       Toggle modal
//                     </button>

//                     <div
//                       id="default-modal"
//                       tabIndex="-1"
//                       aria-hidden="true"
//                       className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//                     >
//                       <div className="relative p-4 w-full max-w-2xl max-h-full">
//                         {/* <!-- Modal content --> */}
//                         <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//                           {/* <!-- Modal header --> */}
//                           <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                               {items.strCategory}
//                             </h3>
//                             <button
//                               type="button"
//                               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                               data-modal-hide="default-modal"
//                             >
//                               <svg
//                                 className="w-3 h-3"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 14 14"
//                               >
//                                 <path
//                                   stroke="currentColor"
//                                   stroke-linecap="round"
//                                   stroke-linejoin="round"
//                                   stroke-width="2"
//                                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                 />
//                               </svg>
//                               <span className="sr-only">Close modal</span>
//                             </button>
//                           </div>

//                           <div className="p-4 md:p-5 space-y-4">
//                             <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//                               hello
//                             </p>
//                           </div>

//                           <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                             <button
//                               data-modal-hide="default-modal"
//                               type="button"
//                               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >
//                               I accept
//                             </button>
//                             <button
//                               data-modal-hide="default-modal"
//                               type="button"
//                               className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                             >
//                               Decline
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </SplideSlide>
//             );
//           })}
//         </Splide>
//       </div>
//     </div>
//   );
// };

// export default Popular;

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
