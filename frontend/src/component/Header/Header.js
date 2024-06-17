import React,{useState} from "react";
import { Link } from "react-router-dom";
import  Search from "../Product/Search";
import logo from "../../images/logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);}
  return (
    <>
       <header className='border-b py-4 px-4 sm:px-10 bg-gradient-to-r from-red-800 to-red-600 font-[sans-serif] min-h-[70px]'>
        <div className='flex flex-wrap items-center gap-x-2 max-lg:gap-y-6'>
          <Link to="/">
            <img src={logo} alt="logo" className='w-36' />
          </Link>
          
            <Link to="/cart" className='lg:hidden ml-auto mr-3'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                          </svg>
            </Link>
            <Link to="/login" className='lg:hidden mr-3 '>
         
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                          </svg>
            
          </Link>
          <button id="toggle" className='lg:hidden' onClick={toggleMenu}>
            <svg className="w-7 h-7 text-white" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
            </button>
          <ul id="collapseMenu"
            className={`lg:flex lg:ml-14 lg:space-x-5 max-lg:space-y-2  max-lg:py-4 max-lg:w-full ${isMenuOpen ? 'block text-center' : 'hidden'}`}>
            <li className='max-lg:py-2 px-3'>
              <Link to='/' className='hover:text-[#ff0000 text-[#f0f2f4] block font-semibold text-[15px]'>Home</Link>
            </li>
            <li className=' max-lg:py-2 px-3'>
              <Link to='/products' className='hover:text-[#ff0000] text-white block font-semibold text-[15px]'>Products</Link>
            </li>
            <li className='max-lg:py-2 px-3'>
              <Link to='/contact' className='hover:text-[#ff0000] text-white block font-semibold text-[15px]'>Contact</Link>
            </li>
            
            <li className='max-lg:py-2 px-3'>
              <Link to='/about' className='hover:text-[#ff0000] text-white block font-semibold text-[15px]'>About</Link>
            </li>
            
          </ul>
          <div className='flex lg:ml-auto max-lg:hidden'>
            <Link to='cart' className='shadow-md flex mr-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                          </svg>
            </Link>
          </div>
          <div className='flex lg:ml-auto max-lg:hidden'>
          
            <Link to='/login' className='shadow-md flex mr-7 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                          </svg>
            </Link>
          </div>
          <Search />
        </div>
      </header>
    </>
  );
};

export default Header;
