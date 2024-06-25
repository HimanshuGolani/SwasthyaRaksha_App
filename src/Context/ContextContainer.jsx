import React, {createContext, useContext, useState} from 'react';

const AppContext = createContext();

const AppFieldsProvider = ({children}) => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [role, setRole] = useState('Normal-User');
  const [healthProfileId, setHealthProfile] = useState('');
  const ipv4 = '192.168.29.45';
  return (
    <AppContext.Provider
      value={{
        ipv4,
        auth,
        setAuth,
        currentUserId,
        setCurrentUserId,
        role,
        setRole,
        name,
        setName,
        email,
        setEmail,
        healthProfileId,
        setHealthProfile,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};

export default AppFieldsProvider;
