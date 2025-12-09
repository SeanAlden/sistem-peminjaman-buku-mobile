import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/app/HomeScreen";
import CategoryDetailScreen from "./screens/app/CategoryDetailScreen";
import BookDetailScreen from "./screens/app/BookDetailScreen";
import ProfileScreen from "./screens/app/ProfileScreen";
import LoanScreen from "./screens/app/LoanScreen";
import CategorySearchScreen from "./screens/app/CategorySearchScreen";
import BookSearchScreen from "./screens/app/BookSearchScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import FavoriteScreen from "./screens/app/FavoriteScreen";

import { AuthContext, AuthProvider } from "./context/AuthContext";

import "./global.css";
import EditProfileScreen from "./screens/app/EditProfileScreen";
import EditPasswordScreen from "./screens/app/EditPasswordScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import VerificationCodeScreen from "./screens/auth/VerificationCodeScreen";
import ResetPasswordScreen from "./screens/auth/ResetPasswordScreen";
import ReservationScreen from "./screens/app/ReservationScreen";
import ChatScreen from "./screens/app/ChatScreen";
import ChatDetailScreen from "./screens/app/ChatDetailScreen";
import { BASE_URL } from "./api/responseUrl";
import ChatListScreen from "./screens/app/ChatListScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const orangeThemeColor = "#f4511e";

/* ChatListScreen: small helper that ensures we have a user and navigates to ChatScreen */

/* HomeStack */
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 22, fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category Detail" component={CategoryDetailScreen} />
      <Stack.Screen name="Book Detail" component={BookDetailScreen} />
      <Stack.Screen name="Category Search" component={CategorySearchScreen} />
      <Stack.Screen name="Book Search" component={BookSearchScreen} />
      <Stack.Screen name="Reservation Screen" component={ReservationScreen} />
      {/* Keep ChatScreen available in this stack too if needed */}
      {/* <Stack.Screen name="ChatScreen" component={ChatStack} /> */}
    </Stack.Navigator>
  );
}

/* ProfileStack */
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 22, fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Favorite Screen" component={FavoriteScreen} />
      <Stack.Screen name="Edit Profile Screen" component={EditProfileScreen} />
      <Stack.Screen
        name="Edit Password Screen"
        component={EditPasswordScreen}
      />
    </Stack.Navigator>
  );
}

/* AuthStack */
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 22, fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Verification Code"
        component={VerificationCodeScreen}
      />
      <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

/* ChatStack (Chats list + Chat screen) */

function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 22, fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{ title: "Chats" }}
      />
      <Stack.Screen
        name="ChatDetailScreen"
        component={ChatDetailScreen}
        options={({ route }) => ({ title: route.params.otherUserName })}
      />
    </Stack.Navigator>
  );
}

/* AppTabs */
function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 22, fontWeight: "bold" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Loan")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Chat")
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person-circle" : "person-circle-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffc9b5",
        tabBarStyle: {
          paddingTop: 5,
          backgroundColor: orangeThemeColor,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Loan" component={LoanScreen} />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

/* Root Navigator */
function RootNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

/* Final App with NavigationContainer */
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
