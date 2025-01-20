import React, { useState } from "react";

export const Searchbar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="">
      <input
        type="text"
        placeholder="Enter your text "
        className="border-red-500 border-2 p-2 rounded-lg gap-2"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Search
      </button>
    </div>
  );
};
