import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className='bg-slate-200' shadow-md>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>MagicSprings</span>
        </h1>
          </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search our products' className='bg-transparent focus:outline-none sm:w-64 w-24'/>
            <FaSearch className="text-slate-600"/>
        </form>
        <ul className="flex gap-6 text-slate-600 font-bold">
        <Link to='/Products'> <li className="hidden sm:inline hover:px-1  transition-all duration-500 hover:text-slate-800 ">Bathroom</li> </Link>
        <Link to='/Products'>  <li className="hidden sm:inline hover:px-1  rounded-lg transition-all duration-300 hover:text-slate-800">Kitchen</li> </Link>
        <Link to='/About'>   <li className="hidden sm:inline hover:px-1  rounded-lg transition-all duration-300 hover:text-slate-800">About Us</li> </Link>
        <Link to='/signUp'>   <li className=" sm:inline sm:text-base text-xs hover:px-1  rounded-lg transition-all duration-300 hover:text-slate-800">Sign in</li> </Link>
        </ul>
        </div>
    </header>
  )
}

export default Header