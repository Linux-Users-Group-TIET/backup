import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../Components/ListingItem"; // Import the ListingItem component

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [series, setSeries] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  const fetchListings = async ({
    searchTerm = "",
    series = "",
    sort = "createdAt",
    order = "desc",
    limit = 9,
    startIndex = 0,
  }) => {
    const url = new URL("/api/listing/get", window.location.origin); // Replace with your actual API URL
    const params = {
      searchTerm,
      series,
      sort,
      order,
      limit,
      startIndex,
    };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    return response.json();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermParam = urlParams.get("searchTerm");
    const seriesParam = urlParams.get("series");
    const sortParam = urlParams.get("sort");

    if (searchTermParam) setSearchTerm(searchTermParam);
    if (seriesParam) setSeries(seriesParam);
    if (sortParam) setSortOrder(sortParam);
  }, []);

  useEffect(() => {
    const fetchAndSetListings = async () => {
      try {
        const listingsData = await fetchListings({
          searchTerm,
          series,
          sort: "createdAt",
          order: sortOrder,
        });
        setListings(listingsData);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchAndSetListings();
  }, [searchTerm, series, sortOrder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (searchTerm) urlParams.set("searchTerm", searchTerm);
    if (series) urlParams.set("series", series);
    urlParams.set("sort", sortOrder);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-gray-100">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              className="whitespace-nowrap text-gray-700 font-medium"
              htmlFor="searchTerm"
            >
              Product:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg p-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <label
              className="whitespace-nowrap text-gray-700 font-medium"
              htmlFor="series"
            >
              Series:
            </label>
            <input
              type="text"
              id="series"
              placeholder="Series..."
              className="border border-gray-300 rounded-lg p-3 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
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
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
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
      <div className="mt-6">
        {listings.length > 0 ? (
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 p-4">
            {listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </ul>
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
