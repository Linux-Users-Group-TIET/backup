import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // State to manage header visibility
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const navigate = useNavigate();
  const productsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    setIsSearching(false);
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <div className="bg-black border-b-2 border-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-gray-100">
          <h1 className="font-bold text-3xl">MagicSprings</h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-grow ml-4 sm:ml-6"
        >
          <input
            type="text"
            placeholder="Search our products"
            className={classNames(
              "bg-transparent focus:outline-none text-gray-100",
              {
                "w-24": !isSearching,
                "w-64": isSearching,
              }
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className="ml-2 focus:outline-none">
            <FaSearch className="text-gray-300" />
          </button>
        </form>
        <ul className="flex gap-6 text-gray-100 font-bold items-center space-x-4 ml-auto">
          <li
            className={classNames(
              {
                "hover:text-gray-300": !isProductsOpen,
                "text-gray-300": isProductsOpen,
              },
              "transition-all duration-300 ml-10"
            )}
          >
            <Link to="/search" className="cursor-pointer">
              Our Products
            </Link>
          </li>
          <li className="hidden sm:inline">
            <Link
              to="/about"
              className="hover:text-gray-300 transition-all duration-300"
            >
              About Us
            </Link>
          </li>
          {currentUser ? (
            <li>
              <Link
                to="/profile"
                className="hover:text-gray-300 transition-all mr-4 duration-300"
              >
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/signin"
                className="hover:text-gray-300 transition-all duration-300"
              >
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
