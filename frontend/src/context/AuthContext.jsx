import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("miniCrmToken"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("miniCrmUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const persistSession = (authData) => {
    localStorage.setItem("miniCrmToken", authData.token);
    localStorage.setItem("miniCrmUser", JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    persistSession(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persistSession(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("miniCrmToken");
    localStorage.removeItem("miniCrmUser");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      user,
      login,
      logout,
      register
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
