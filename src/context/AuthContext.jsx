import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  loading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setLoading(true);
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
        });

        setIsAuthenticated(true);

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     const cookieFallback = localStorage.getItem("cookieFallback");
//     if (
//       cookieFallback === "[]" 
//     //   cookieFallback === null ||
//     //   cookieFallback === undefined
//     ) {
//       navigate("/");
//     }

//     checkAuthUser();
//   }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
