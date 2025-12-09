// import React, { createContext, useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     const token = await AsyncStorage.getItem("auth_token");
//     setIsAuthenticated(!!token);
//     setLoading(false);
//   };

//   const login = async (token) => {
//     await AsyncStorage.setItem("auth_token", token);
//     setIsAuthenticated(true);
//   };

//   const logout = async () => {
//     await AsyncStorage.removeItem("auth_token");
//     setIsAuthenticated(false);
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, loading, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../api/responseUrl"; // Pastikan import BASE_URL

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Tambahkan state User
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
        // Cek validitas token sekaligus ambil data user
        const res = await fetch(`${BASE_URL}/api/api/user`, { // Pastikan endpoint ini ada di Laravel
          headers: {
             Authorization: `Bearer ${token}`,
             Accept: "application/json" 
          },
        });
        
        if (res.ok) {
           const userData = await res.json();
           setUser(userData); // Simpan data user (termasuk ID)
           setIsAuthenticated(true);
        } else {
           // Token expired atau invalid
           await AsyncStorage.removeItem("auth_token");
           setIsAuthenticated(false);
           setUser(null);
        }
      }
    } catch (e) {
      console.log("Auth check failed", e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    await AsyncStorage.setItem("auth_token", token);
    await checkAuth(); // Panggil checkAuth lagi untuk set User
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Masukkan 'user' ke dalam value provider
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};