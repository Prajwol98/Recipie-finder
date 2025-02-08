import { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  function handleChange(e) {
    setSearch(e.target.value);
  }
  return (
    <div className="flex justify-center items-center space-x-4 p-4">
      <input
        type="text"
        placeholder="Enter your meal name"
        className="w-1/3 p-2 border-2 border-gray-300 rounded-lg "
        value={search}
        onChange={handleChange}
      ></input>

      <button className="p-2 bg-blue-500 text-white rounded-lg">Search</button>
    </div>
  );
};

export default Searchbar;
