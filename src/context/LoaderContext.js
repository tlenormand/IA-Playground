import React, { createContext, useState } from 'react';

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  // when setIsLoading, use 0.2s delay to set isLoading to true
  // this is to prevent the loader from flashing on the screen
  const [isLoading, setIsLoading] = useState(false);


  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
