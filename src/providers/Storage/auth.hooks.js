import { useContext, useEffect } from 'react';
import { StorageContext } from './index';

export const useAuth = () => {
  const {
    meta: {
      storage: { authInfo },
    },
    auth: { logout, saveAuthInfo },
  } = useContext(StorageContext);

  useEffect(() => {
    localStorage.authInfo = JSON.stringify(authInfo);
  }, [authInfo]);

  return {
    authInfo,
    logout,
    saveAuthInfo,
    isLoggedIn: !!Object.keys(authInfo).length,
  };
};
