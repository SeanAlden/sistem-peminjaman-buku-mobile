// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import App from "../App";
// import AuthNavigator from "./AuthNavigator";

// export default function AppEntry() {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     AsyncStorage.getItem("auth_token").then((token) => {
//       setIsAuthenticated(!!token);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return isAuthenticated ? <App /> : <AuthNavigator />;
// }

import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import App from "../App";
import AuthNavigator from "./AuthNavigator";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
// import { AuthContext, AuthProvider } from "./AuthContext";

function AppContent() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? <App /> : <AuthNavigator />;

  //   return (
  //     <NavigationContainer>
  //       {" "}
  //       {/* ✅ Letakkan hanya di sini */}
  //       {isAuthenticated ? <App /> : <AuthNavigator />}
  //     </NavigationContainer>
  //   );
}

export default function AppEntry() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}
