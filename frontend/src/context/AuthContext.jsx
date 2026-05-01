import React, { createContext, useContext } from 'react'
import { useState } from 'react'
import { api, clearAuthToken, setAuthToken } from '../lib/api';

 const AuthContext = createContext(null)

export const AuthProvider =({children })=>{
const [user, setUser] = useState(null);

const login = async(values)=>{
  const data = await api.auth.login(values);
  console.log(data.data);
  
  setAuthToken(data.token);
  localStorage.setItem('authToken', data.user);
  setUser(data.user);
  }

  const logout = async () => {
    clearAuthToken();
    setUser(null);
  };

   return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}
