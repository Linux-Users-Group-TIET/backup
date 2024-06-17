import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-gray-100">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              className="whitespace-nowrap text-gray-700 font-medium"
              htmlFor="searchTerm"
            >
              Search Product:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg p-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              className="whitespace-nowrap text-gray-700 font-medium"
              htmlFor="sort_order"
            >
              Sort:
            </label>
            <select
              id="sort_order"
              className="border border-gray-300 rounded-lg p-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="desc">Price high to low</option>
              <option value="asc">Price low to high</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:bg-slate-700 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
