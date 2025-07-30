// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons'; // Pastikan expo/vector-icons tersedia

// export default function ProfileScreen() {
//   const userEmail = "user@example.com";

//   const handlePress = (action) => {
//     console.log(`${action} pressed`);
//     // Tambahkan navigasi atau aksi lainnya sesuai kebutuhan
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* TabBar */}
//       {/* <View style={styles.tabBar}>
//         <Text style={styles.tabTitle}>Profile</Text>
//       </View> */}

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Profile Image */}
//         <Image
//           source={require('../assets/profile.png' )} // Ganti dengan URL gambar profil user
//           style={styles.profileImage}
//         />

//         {/* User Email */}
//         <Text style={styles.emailText}>{userEmail}</Text>

//         {/* Settings Menu */}
//         <View style={styles.settingsContainer}>
//           <Text style={styles.settingsTitle}>Settings</Text>

//           <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Edit Profile')}>
//             <Ionicons name="person-outline" size={20} color="#555" />
//             <Text style={styles.menuText}>Edit Profile</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Edit Password')}>
//             <Ionicons name="lock-closed-outline" size={20} color="#555" />
//             <Text style={styles.menuText}>Edit Password</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Favorite')}>
//             <Ionicons name="heart-outline" size={20} color="#555" />
//             <Text style={styles.menuText}>Favorite</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.menuItem} onPress={() => handlePress('Logout')}>
//             <Ionicons name="log-out-outline" size={20} color="#d00" />
//             <Text style={[styles.menuText, { color: '#d00' }]}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // ==================
// // 💅 STYLE
// // ==================
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   tabBar: {
//     paddingVertical: 16,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   tabTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   content: {
//     alignItems: 'center',
//     paddingVertical: 0,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     marginBottom: 12,
//   },
//   emailText: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 24,
//   },
//   settingsContainer: {
//     width: '90%',
//   },
//   settingsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   menuText: {
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#333',
//   },
// });

// Pakai NativeWind
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// export default function ProfileScreen() {
//   const userEmail = "user@example.com";

//   const handlePress = (action) => {
//     console.log(`${action} pressed`);
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
//         {/* Profile Image */}
//         <Image
//           source={require('../assets/profile.png')}
//           className="mt-0 mb-3 border-2 border-gray-300 rounded-full w-28 h-28"
//         />

//         {/* Email */}
//         <Text className="mb-6 text-base text-gray-600">{userEmail}</Text>

//         {/* Settings Menu */}
//         <View className="w-[90%]">
//           <Text className="mb-3 text-lg font-bold text-gray-800">Settings</Text>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => handlePress('Edit Profile')}
//           >
//             <Ionicons name="person-outline" size={20} color="#555" />
//             <Text className="ml-3 text-base text-gray-800">Edit Profile</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => handlePress('Edit Password')}
//           >
//             <Ionicons name="lock-closed-outline" size={20} color="#555" />
//             <Text className="ml-3 text-base text-gray-800">Edit Password</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => handlePress('Favorite')}
//           >
//             <Ionicons name="heart-outline" size={20} color="#555" />
//             <Text className="ml-3 text-base text-gray-800">Favorite</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => handlePress('Logout')}
//           >
//             <Ionicons name="log-out-outline" size={20} color="#d00" />
//             <Text className="ml-3 text-base text-red-600">Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext"; // pastikan path sesuai struktur proyek kamu
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../api/responseUrl";
import { useEffect } from "react";

export default function ProfileScreen() {
  // const userEmail = "user@example.com"; // Optional: ambil dari state/global
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("user@example.com");

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) throw new Error("Token not found");

      await axios.post(
        `${BASE_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      await logout(); // hapus token dari storage
      await AsyncStorage.removeItem("auth_user"); // menghapus data user dari AsyncStorage

      // navigation.navigate("Login");
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Login" }],
      // });
    } catch (error) {
      console.error("Logout error:", error.message);
      Alert.alert("Logout Gagal", "Terjadi kesalahan saat logout.");
    }
  };

  const handlePress = (action) => {
    if (action === "Logout") {
      Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin logout?", [
        { text: "Batal", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: handleLogout },
      ]);
    } else {
      console.log(`${action} pressed`);
    }
  };

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("auth_user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserEmail(user.email || "guest@example.com");
      }
    } catch (err) {
      console.error("Gagal load user:", err);
    }
  };

  useEffect(() => {
    loadUser(); // ambil user dari async storage

    const interval = setInterval(() => {
      loadUser();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {/* Profile Image */}
        <Image
          source={require("../assets/profile.png")}
          className="mt-0 mb-3 border-2 border-gray-300 rounded-full w-28 h-28"
        />

        {/* Email */}
        <Text className="mb-6 text-base text-gray-600">{userEmail}</Text>

        {/* Settings Menu */}
        <View className="w-[90%]">
          <Text className="mb-3 text-lg font-bold text-gray-800">Settings</Text>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200"
            onPress={() => handlePress("Edit Profile")}
          >
            <Ionicons name="person-outline" size={20} color="#555" />
            <Text className="ml-3 text-base text-gray-800">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200"
            onPress={() => handlePress("Edit Password")}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#555" />
            <Text className="ml-3 text-base text-gray-800">Edit Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200"
            onPress={() => navigation.navigate("FavoriteScreen")}
          >
            <Ionicons name="heart-outline" size={20} color="#555" />
            <Text className="ml-3 text-base text-gray-800">Favorite</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200"
            onPress={() => handlePress("Logout")}
          >
            <Ionicons name="log-out-outline" size={20} color="#d00" />
            <Text className="ml-3 text-base text-red-600">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
