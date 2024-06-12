import React, {createContext, useContext, useState} from 'react';

const AppContext = createContext();

const AppFieldsProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [role, setRole] = useState('Normal-User');
  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        currentUserId,
        setCurrentUserId,
        role,
        setRole,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default AppFieldsProvider;
