// import React from "react";
// import { useEffect, useState } from "react";

// const Popular = () => {
//   const [popular, setPopular] = useState();

//   const getData = async () => {
//     try {
//       const api = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
//       );
//       const data = await api.json();
//       console.log(data.meals);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h1>Popular</h1>
//       </div>
//     </div>
//   );
// };

// export default Popular;

import React, { useEffect, useState } from "react";

const Popular = () => {
  const [popular, setPopular] = useState(null); // Initialize state as null

  const getData = async () => {
    try {
      const api = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
        // "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
      );
      const data = await api.json();
      console.log(data.categories.slice(0, 8)); // Log fetched data
      // setPopular(data.meals.slice(0, 9)); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error); // Log error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Popular</h1>
    </div>
  );
};

export default Popular;
