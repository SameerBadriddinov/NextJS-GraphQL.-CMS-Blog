import React from 'react';
import { Header } from '.';
import FeaturedPosts from '../sections/FeaturedPosts';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <FeaturedPosts />
      {children}
    </>
  )
};

export default Layout;
