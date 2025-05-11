import { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

const login = (sessionData: any) => {
        localStorage.setItem('session', JSON.stringify(sessionData));
        setSession(sessionData);
};

const logout = () => {
        localStorage.removeItem('session');
        setSession(null);
};

    return (
        <SessionContext.Provider value={null}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
      throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
  };