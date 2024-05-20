import React, { createContext, useContext, useState, useEffect } from 'react';

const PageContext = createContext();

const PageProvider = ({ children }) => {
  const [page, setPage] = useState(0);

  const value = {
    page, setPage
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

const usePage = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error('fff');
  }
  return context;
};

export { PageProvider, usePage };