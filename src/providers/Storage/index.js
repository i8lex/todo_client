import React, { createContext, useState } from "react";

export const StorageContext = createContext({});

StorageContext.displayName = "Storage";

export const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useState({
    authInfo: localStorage.authInfo ? JSON.parse(localStorage.authInfo) : {},
  });

  const value = {
    meta: {
      storage,
      setStorage,
    },
    auth: {
      logout: () => {
        setStorage((prevState) => {
          return {
            ...prevState,
            authInfo: {},
          };
        });
      },
      saveAuthInfo: (values) => {
        setStorage((prevState) => {
          return {
            ...prevState,
            authInfo: values,
          };
        });
      },
    },
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};
