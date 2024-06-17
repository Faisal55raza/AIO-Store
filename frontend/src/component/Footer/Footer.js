import React, { useState } from 'react'
import { useAlert } from "react-alert";
const Footer = () => {
  const alert = useAlert();
  const[em,setem] = useState("");
  return (
    <>
    
  <footer className="text-gray-600 body-font bg-gradient-to-r from-red-900 to-red-600">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

      <div className="flex-grow flex flex-wrap md:pl-0 -mb-10 md:mt-0 mt-10 md:text-left text-center">
       <div className='flex-grow flex '>
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">About</h2>
          <nav className="list-none mb-10">
            <li>
              <a className="text-white hover:text-red-300" href="#">Contact Us</a>
            </li>
            <li>
              <a className="text-white hover:text-red-300" href="#">Help</a>
            </li>
            <li>
              <a className="text-white hover:text-red-300" href="#">Mail Us</a>
            </li>
            <li>
              <a className="text-white hover:text-red-300" href="#">Company</a>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-bold text-white tracking-widest text-md mb-3">Address</h2>
          <nav className="list-none mb-10">
            <li>
              <p className="text-white hover:text-red-300" href="#">Delta 1,</p>
            </li>
            <li>
              <p className="text-white hover:text-red-300" href="#">Greater Noida,</p>
            </li>
            <li>
              <p className="text-white hover:text-red-300" href="#">Uttar Pradesh,</p>
            </li>
            <li>
              <p className="text-white hover:text-red-300" href="#">India</p>
            </li>
          </nav>
        </div>
        </div>
        <div className="max-w-xl lg:max-w-lg">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>

        <div className="mt-6 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" value={em} onChange={(e)=>setem(e.target.value)} placeholder="Enter your email" />
          <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={()=>{alert.success("Thank You For Subscribing"); setem('')}}>Subscribe</button>
        </div>
        
      </div>
      </div>
    </div>
    <div className="bg-red-900">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-white text-sm text-center sm:text-left">© 2024          <a href="https://www.linkedin.com/in/faisal-raza-86556a258" rel="noopener noreferrer" className="text-gray-400 ml-1" target="_blank">@Faisal</a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <a className="text-gray-200">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-200">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-200">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a className="ml-3 text-gray-200">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </div>
  </footer>

  </>
  )
}

export default Footer;