import React, { createContext, useState } from "react";

export const StorageContext = createContext({});

StorageContext.displayName = "Storage";

export const StorageProvider = ({ children }) => {
  const [storage, setStorage] = useState({
    authInfo: sessionStorage.authInfo
      ? JSON.parse(sessionStorage.authInfo)
      : {},
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
