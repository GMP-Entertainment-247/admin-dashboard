import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { ILogin, IUser } from '../interface/auth';
import { useSingleState } from '../utils/hooks/useSingleState';

type AuthContextType = {
  token: string;
  login: (val: ILogin) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = useSingleState("");
  const userData = useSingleState<IUser | null>(null)

  const login = (val: ILogin) => {
    token.set(val.token ?? "")
    userData.set(val.user ?? null)
  }
  const logout = () => {
    token.set("")
    userData.set(null)

  };

  return (
    <AuthContext.Provider 
      value={{ 
        token: token.get, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
