import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold sm:text-xl flex flex-wrap">
            <span className="text-slate-500">MagicSprings</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search our products"
            className="bg-transparent focus:outline-none sm:w-64 w-24"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-6 text-slate-600 font-bold">
          <Link to="/search">
            <li className="hidden sm:inline hover:px-1 transition-all duration-500 hover:text-slate-800">
              Our Products
            </li>
          </Link>
          {/* <Link to="/Products">
            <li className="hidden sm:inline hover:px-1 rounded-lg transition-all duration-300 hover:text-slate-800">
              Kitchen
            </li>
          </Link> */}
          <Link to="/About">
            <li className="hidden sm:inline hover:px-1 rounded-lg transition-all duration-300 hover:text-slate-800">
              About Us
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/signIn">
              <li className="sm:inline hover:px-1 rounded-lg transition-all duration-300 hover:text-slate-800">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
