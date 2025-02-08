import { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  async function handleSearch() {
    if (!search.trim()) return;
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`
      );
      const data = await response.json();

      if (data.meals) {
        setResults(data.meals);
        console.log(data.meals);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="flex justify-center items-center space-x-4">
        <input
          type="text"
          placeholder="Enter your meal name"
          className="w-1/3 p-2 border-2 border-gray-300 rounded-lg outline-none"
          value={search}
          onChange={handleChange}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="w-1/2">
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((meal) => (
              <li key={meal.idMeal} className="p-2 border rounded-lg shadow-sm">
                {meal.strMeal}
              </li>
            ))}
          </ul>
        ) : (
          search && <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
