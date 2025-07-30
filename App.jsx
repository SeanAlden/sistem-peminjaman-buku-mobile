// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import StudentListScreen from './screens/StudentListScreen';
// import AddStudentScreen from './screens/AddStudentScreen';
// import EditStudentScreen from './screens/EditStudentScreen';
// import StudentDetailScreen from './screens/StudentDetailScreen';
// import "./global.css"

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="StudentList">
//         <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'Student List' }} />
//         <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Add Student' }} />
//         <Stack.Screen name="EditStudent" component={EditStudentScreen} options={{ title: 'Edit Student' }} />
//         <Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'Student Detail' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Komponen untuk halaman kosong
// function EmptyScreen({ route }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>{route.name} Page (Kosong)</Text>
//     </View>
//   );
// }

// // Buat Tab Navigator
// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerShown: false,
//           tabBarActiveTintColor: '#007bff',
//           tabBarInactiveTintColor: 'gray',
//           tabBarLabelStyle: { fontSize: 14 },
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Loan" component={EmptyScreen} />
//         <Tab.Screen name="Notification" component={EmptyScreen} />
//         <Tab.Screen name="Profile" component={EmptyScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// // App.jsx

// import React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "./screens/HomeScreen";

// // BARU: Impor library icon
// import Icon from "react-native-vector-icons/Ionicons";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// // Komponen untuk halaman kosong
// function EmptyScreen({ route }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>{route.name} Page (Kosong)</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Home"
//           screenOptions={({ route }) => ({
//             // DIUBAH: Menggunakan fungsi untuk mengatur opsi layar
//             headerShown: true, // Tampilkan header untuk semua layar
//             headerStyle: {
//               backgroundColor: "#ffffff",
//               elevation: 1, // Bayangan tipis untuk Android
//               shadowOpacity: 0.1, // Bayangan tipis untuk iOS
//             },
//             headerTitleStyle: {
//               fontSize: 22,
//               fontWeight: "bold",
//             },
//             tabBarIcon: ({ focused, color, size }) => {
//               // BARU: Logika untuk menampilkan icon
//               let iconName;
//               if (route.name === "Home") {
//                 iconName = focused ? "home" : "home-outline";
//               } else if (route.name === "Loan") {
//                 iconName = focused ? "book" : "book-outline";
//               } else if (route.name === "Notification") {
//                 iconName = focused ? "notifications" : "notifications-outline";
//               } else if (route.name === "Profile") {
//                 iconName = focused ? "person-circle" : "person-circle-outline";
//               }
//               // Anda bisa mengganti nama ikon sesuai selera dari library Ionicons
//               return <Icon name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: "#007bff", // Warna ikon & teks saat aktif
//             tabBarInactiveTintColor: "gray", // Warna ikon & teks saat tidak aktif
//             tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
//             tabBarStyle: {
//               // height: 60,
//               paddingTop: 5 },
//           })}
//         >
//           {/* DIUBAH: Menambahkan judul pada header Home */}
//           <Tab.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{ title: "Beranda" }}
//           />
//           <Tab.Screen
//             name="Loan"
//             component={EmptyScreen}
//             options={{ title: "Pinjaman" }}
//           />
//           <Tab.Screen
//             name="Notification"
//             component={EmptyScreen}
//             options={{ title: "Notifikasi" }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={EmptyScreen}
//             options={{ title: "Profil" }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// import React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "./screens/HomeScreen";

// // Impor library icon
// import Icon from "react-native-vector-icons/Ionicons";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// // Komponen untuk halaman kosong
// function EmptyScreen({ route }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>{route.name} Page (Kosong)</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   const orangeThemeColor = '#f4511e'; // Definisikan warna tema jingga

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Home"
//           screenOptions={({ route }) => ({
//             headerShown: true,
//             // DIUBAH: Style untuk header (AppBar)
//             headerStyle: {
//               backgroundColor: orangeThemeColor, // Latar belakang jingga
//             },
//             headerTintColor: '#ffffff', // Warna teks dan ikon panah di header menjadi putih
//             headerTitleAlign: 'center', // Posisi judul di tengah
//             headerTitleStyle: {
//               fontSize: 22,
//               fontWeight: "bold",
//             },

//             // Logika untuk menampilkan icon
//             tabBarIcon: ({ focused, color, size }) => {
//               let iconName;
//               if (route.name === "Home") {
//                 iconName = focused ? "home" : "home-outline";
//               } else if (route.name === "Loan") {
//                 iconName = focused ? "book" : "book-outline";
//               } else if (route.name === "Notification") {
//                 iconName = focused ? "notifications" : "notifications-outline";
//               } else if (route.name === "Profile") {
//                 iconName = focused ? "person-circle" : "person-circle-outline";
//               }
//               return <Icon name={iconName} size={size} color={color} />;
//             },

//             // DIUBAH: Style untuk Bottom Navigation Bar
//             tabBarActiveTintColor: '#ffffff', // Warna ikon & teks saat aktif (Putih)
//             tabBarInactiveTintColor: '#ffc9b5', // Warna ikon & teks saat tidak aktif (Jingga muda)
//             tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
//             tabBarStyle: {
//               paddingTop: 5,
//               backgroundColor: orangeThemeColor, // Latar belakang jingga
//               borderTopWidth: 0, // Hapus garis pemisah di atas tab bar
//               elevation: 0, // Hapus bayangan di Android
//             },
//           })}
//         >
//           {/* Layar-layar navigasi */}
//           <Tab.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{ title: "Beranda" }}
//           />
//           <Tab.Screen
//             name="Loan"
//             component={EmptyScreen}
//             options={{ title: "Pinjaman" }}
//           />
//           <Tab.Screen
//             name="Notification"
//             component={EmptyScreen}
//             options={{ title: "Notifikasi" }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={EmptyScreen}
//             options={{ title: "Profil" }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// ===========================================
// ===========================================
// ===========================================

// import React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack"; // BARU

// import HomeScreen from "./screens/HomeScreen";
// import CategoryDetailScreen from "./screens/CategoryDetailScreen"; // BARU

// import Icon from "react-native-vector-icons/Ionicons";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator(); // BARU
// const orangeThemeColor = "#f4511e";

// // Komponen untuk halaman kosong
// function EmptyScreen({ route }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>{route.name} Page (Kosong)</Text>
//     </View>
//   );
// }

// // BARU: Stack Navigator untuk flow di dalam Tab Home
// function HomeStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: orangeThemeColor },
//         headerTintColor: "#ffffff",
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontSize: 22,
//           fontWeight: "bold",
//         },
//       }}
//     >
//       <Stack.Screen
//         name="Beranda"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CategoryDetail"
//         component={CategoryDetailScreen}
//         // Judul header akan diambil dari nama kategori yang dikirim
//         options={({ route }) => ({ title: route.params.categoryName })}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Home"
//           screenOptions={({ route }) => ({
//             // DIUBAH: Header utama sekarang dikelola oleh StackNavigator
//             headerShown: false,
//             tabBarIcon: ({ focused, color, size }) => {
//               let iconName;
//               if (route.name === "Home")
//                 iconName = focused ? "home" : "home-outline";
//               else if (route.name === "Loan")
//                 iconName = focused ? "book" : "book-outline";
//               else if (route.name === "Notification")
//                 iconName = focused ? "notifications" : "notifications-outline";
//               else if (route.name === "Profile")
//                 iconName = focused ? "person-circle" : "person-circle-outline";
//               return <Icon name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: "#ffffff",
//             tabBarInactiveTintColor: "#ffc9b5",
//             tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
//             tabBarStyle: {
//               paddingTop: 5,
//               backgroundColor: orangeThemeColor,
//               borderTopWidth: 0,
//             },
//           })}
//         >
//           {/* DIUBAH: Komponen untuk Tab Home sekarang adalah HomeStack */}
//           <Tab.Screen name="Home" component={HomeStack} />
//           <Tab.Screen
//             name="Loan"
//             component={EmptyScreen}
//             options={{ title: "Pinjaman", headerShown: true }}
//           />
//           <Tab.Screen
//             name="Notification"
//             component={EmptyScreen}
//             options={{ title: "Notifikasi", headerShown: true }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={EmptyScreen}
//             options={{ title: "Profil", headerShown: true }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// import React from "react";
// import { View, Text } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";

// import HomeScreen from "./screens/HomeScreen";
// import CategoryDetailScreen from "./screens/CategoryDetailScreen";

// import Icon from "react-native-vector-icons/Ionicons";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import BookDetailScreen from "./screens/BookDetailScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import LoanScreen from "./screens/LoanScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import "./global.css";
// import CategorySearchScreen from "./screens/CategorySearchScreen";
// import BookSearchScreen from "./screens/BookSearchScreen";
// import LoginScreen from "./screens/LoginScreen";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
// const orangeThemeColor = "#f4511e";

// // Komponen untuk halaman kosong
// // function EmptyScreen({ route }) {
// //   return (
// //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //       <Text>{route.name} Page (Kosong)</Text>
// //     </View>
// //   );
// // }

// // Stack Navigator untuk flow di dalam Tab Home
// function HomeStack() {
//   return (
//     <Stack.Navigator
//       // DIUBAH: Style header sekarang dikelola oleh Tab.Navigator,
//       // namun tetap didefinisikan di sini untuk menjaga konsistensi jika ada layar lain di stack.
//       screenOptions={{
//         headerStyle: { backgroundColor: orangeThemeColor },
//         headerTintColor: "#ffffff",
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontSize: 22,
//           fontWeight: "bold",
//         },
//       }}
//     >
//       {/* DIUBAH: Header untuk 'Beranda' sekarang ditampilkan */}
//       <Stack.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         // options={{ headerShown: false }} // Jika tidak mau menampilkan tabbar atau header dari halaman
//       />
//       <Stack.Screen
//         name="CategoryDetail"
//         component={CategoryDetailScreen}
//         options={({ route }) => ({ title: route.params.categoryName })}
//       />
//       <Stack.Screen
//         name="BookDetail"
//         component={BookDetailScreen}
//         options={({ route }) => ({ title: route.params.book.title })}
//       />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="CategorySearch" component={CategorySearchScreen} />
//       <Stack.Screen name="BookSearch" component={BookSearchScreen} />
//       <Stack.Screen name="LoginScreen" component={LoginScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Home"
//           screenOptions={({ route }) => ({
//             // DIUBAH: Terapkan style header secara global ke semua tab
//             headerStyle: {
//               backgroundColor: orangeThemeColor,
//             },
//             headerTintColor: "#FFFFFFFF",
//             headerTitleAlign: "center",
//             headerTitleStyle: {
//               fontSize: 22,
//               fontWeight: "bold",
//             },

//             // Konfigurasi Tab Bar (ikon, warna, dll)
//             tabBarIcon: ({ focused, color, size }) => {
//               let iconName;
//               if (route.name === "Home")
//                 iconName = focused ? "home" : "home-outline";
//               else if (route.name === "Loan")
//                 iconName = focused ? "book" : "book-outline";
//               else if (route.name === "Notification")
//                 iconName = focused ? "notifications" : "notifications-outline";
//               else if (route.name === "Profile")
//                 iconName = focused ? "person-circle" : "person-circle-outline";
//               return <Icon name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: "#ffffff",
//             tabBarInactiveTintColor: "#ffc9b5",
//             tabBarStyle: {
//               paddingTop: 5,
//               backgroundColor: orangeThemeColor,
//               borderTopWidth: 0,
//             },
//           })}
//         >
//           {/* DIUBAH: Sembunyikan header dari Tab Navigator untuk 'Home' agar tidak double */}
//           <Tab.Screen
//             name="Home"
//             component={HomeStack}
//             options={{ headerShown: false }}
//           />
//           <Tab.Screen
//             name="Loan"
//             component={LoanScreen}
//             options={{ title: "Loan" }}
//           />
//           <Tab.Screen
//             name="Notification"
//             component={NotificationScreen}
//             options={{ title: "Notification" }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{ title: "Profile" }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import Icon from "react-native-vector-icons/Ionicons";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import HomeScreen from "./screens/HomeScreen";
// import CategoryDetailScreen from "./screens/CategoryDetailScreen";
// import BookDetailScreen from "./screens/BookDetailScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import LoanScreen from "./screens/LoanScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import CategorySearchScreen from "./screens/CategorySearchScreen";
// import BookSearchScreen from "./screens/BookSearchScreen";
// import LoginScreen from "./screens/LoginScreen"; // ✅ Tambahkan ini

// import "./global.css";
// import RegisterScreen from "./screens/RegisterScreen";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const orangeThemeColor = "#f4511e";

// // Stack untuk navigasi di dalam tab Home
// function HomeStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: orangeThemeColor },
//         headerTintColor: "#ffffff",
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontSize: 22,
//           fontWeight: "bold",
//         },
//       }}
//     >
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen
//         name="CategoryDetail"
//         component={CategoryDetailScreen}
//         options={({ route }) => ({ title: route.params.categoryName })}
//       />
//       <Stack.Screen
//         name="BookDetail"
//         component={BookDetailScreen}
//         options={({ route }) => ({ title: route.params.book.title })}
//       />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="CategorySearch" component={CategorySearchScreen} />
//       <Stack.Screen name="BookSearch" component={BookSearchScreen} />
//       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//     </Stack.Navigator>
//   );
// }

// // ✅ Tab Navigator utama setelah login
// function AppTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={({ route }) => ({
//         headerStyle: {
//           backgroundColor: orangeThemeColor,
//         },
//         headerTintColor: "#FFFFFFFF",
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontSize: 22,
//           fontWeight: "bold",
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if (route.name === "Home")
//             iconName = focused ? "home" : "home-outline";
//           else if (route.name === "Loan")
//             iconName = focused ? "book" : "book-outline";
//           else if (route.name === "Notification")
//             iconName = focused
//               ? "notifications"
//               : "notifications-outline";
//           else if (route.name === "Profile")
//             iconName = focused
//               ? "person-circle"
//               : "person-circle-outline";
//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#ffffff",
//         tabBarInactiveTintColor: "#ffc9b5",
//         tabBarStyle: {
//           paddingTop: 5,
//           backgroundColor: orangeThemeColor,
//           borderTopWidth: 0,
//         },
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeStack}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen name="Loan" component={LoanScreen} />
//       <Tab.Screen name="Notification" component={NotificationScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// // ✅ Stack utama (termasuk Login dan MainApp)
// // function MainStack() {
// //   return (
// //     <Stack.Navigator screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="Login" component={LoginScreen} />
// //       <Stack.Screen name="MainApp" component={AppTabs} />
// //     </Stack.Navigator>
// //   );
// // }

// // Root App
// // export default function App() {
// //   return (
// //     <SafeAreaProvider>
// //       <NavigationContainer>
// //         <MainStack />
// //       </NavigationContainer>
// //     </SafeAreaProvider>
// //   );
// // }

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <AppTabs />
//     </SafeAreaProvider>
//   );
// }

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import CategoryDetailScreen from "./screens/CategoryDetailScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoanScreen from "./screens/LoanScreen";
import NotificationScreen from "./screens/NotificationScreen";
import CategorySearchScreen from "./screens/CategorySearchScreen";
import BookSearchScreen from "./screens/BookSearchScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FavoriteScreen from "./screens/FavoriteScreen";

import { AuthContext, AuthProvider } from "./context/AuthContext"; // penting!

import "./global.css";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const orangeThemeColor = "#f4511e";

// Stack untuk tab Home
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category Detail" component={CategoryDetailScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="CategorySearch" component={CategorySearchScreen} />
      <Stack.Screen name="BookSearch" component={BookSearchScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

// Navigator untuk bagian dalam aplikasi setelah login
function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: orangeThemeColor },
        headerTintColor: "#ffffff",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 22, fontWeight: "bold" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreen")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Loan")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Notification")
            iconName = focused ? "notifications" : "notifications-outline";
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
        name="HomeScreen"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Loan" component={LoanScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{headerShown:false}} />
    </Tab.Navigator>
  );
}

// 🔐 Root Navigator yang menentukan apakah user sudah login atau belum
function RootNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null; // loading splash bisa ditambahkan di sini

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

// Final App
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* <NavigationContainer> */}
        <RootNavigator />
        {/* </NavigationContainer> */}
      </AuthProvider>
    </SafeAreaProvider>
  );
}
