import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { ILogin, IUser } from '../interface/auth.interface';
import { useSingleState } from '../utils/hooks/useSingleState';

type AuthContextType = {
  token: string;
  login: (val: ILogin) => void;
  logout: () => void;
  authEmail: string;
  setAuthEmail: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getInitialToken = () => sessionStorage.getItem("token") || "";

  const token = useSingleState(getInitialToken());
  const userData = useSingleState<IUser | null>(null);
  const authEmail = useSingleState("");

  const login = (val: ILogin) => {
    token.set(val.token ?? "");
    userData.set(val.user ?? null);
    sessionStorage.setItem("token", val.token ?? "");
  };
  const logout = () => {
    token.set("");
    userData.set(null);
    sessionStorage.removeItem("token");
  };

  const setAuthEmail = (email: string) => {
    authEmail.set(email);
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token: token.get, 
        login, 
        logout, 
        authEmail: authEmail.get,
        setAuthEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
