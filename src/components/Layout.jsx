import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <main className='max-w-md md:max-w-2xl mx-auto px-4 sm:px-0'>
      <NavBar/>
      {children}
    </main>
  );
};

export default Layout;
