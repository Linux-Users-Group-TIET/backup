import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
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
    <header
      className={classNames(
        "bg-gradient-to-r from-gray-200 to-gray-300 shadow-lg relative transition-transform duration-300",
        {
          "-translate-y-full": !isHeaderVisible,
        }
      )}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="text-gray-800">
          <h1 className="font-bold text-3xl">MagicSprings</h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 rounded-lg flex items-center shadow-md"
        >
          <input
            type="text"
            placeholder="Search our products"
            className={classNames(
              "bg-transparent focus:outline-none sm:w-64 w-24 text-gray-800",
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
            <FaSearch className="text-gray-600" />
          </button>
        </form>
        <ul className="flex gap-6 text-gray-800 font-bold items-center space-x-4">
          <li
            ref={productsRef}
            className={classNames(
              "relative",
              {
                "hover:text-gray-600": !isProductsOpen,
                "text-gray-600": isProductsOpen,
              },
              "transition-all duration-300"
            )}
          >
            <span
              onClick={toggleProductsMenu}
              className="cursor-pointer inline-block"
            >
              Our Products
            </span>
            {isProductsOpen && (
              <div className="absolute bg-white mt-2 py-2 px-4 rounded-lg shadow-md top-full left-0 z-10 transition-all duration-300">
                <Link
                  to="/search"
                  className="block py-1 hover:text-gray-700 transition-all duration-300"
                >
                  Category 1
                </Link>
                <Link
                  to="/search"
                  className="block py-1 hover:text-gray-700 transition-all duration-300"
                >
                  Category 2
                </Link>
                <Link
                  to="/search"
                  className="block py-1 hover:text-gray-700 transition-all duration-300"
                >
                  Category 3
                </Link>
              </div>
            )}
          </li>
          <Link
            to="/About"
            className="hover:text-gray-600 transition-all duration-300"
          >
            <li className="hidden sm:inline">About Us</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-8 w-8 object-cover hover:animate-bounce"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link
              to="/signIn"
              className="hover:text-gray-600 transition-all duration-300"
            >
              <li className="sm:inline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
