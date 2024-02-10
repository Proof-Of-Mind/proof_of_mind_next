"use client";
import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const defaultState: LoadingContextType = {
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
};

const LoadingContext = createContext<LoadingContextType>(defaultState);

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: any) => {
  const [isLoading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
