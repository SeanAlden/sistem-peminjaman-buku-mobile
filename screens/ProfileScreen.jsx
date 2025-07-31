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

// import React, { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { AuthContext } from "../context/AuthContext"; // pastikan path sesuai struktur proyek kamu
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { BASE_URL } from "../api/responseUrl";
// import { useEffect } from "react";

// export default function ProfileScreen() {
//   // const userEmail = "user@example.com"; // Optional: ambil dari state/global
//   const { logout } = useContext(AuthContext);
//   const navigation = useNavigation();
//   const [userEmail, setUserEmail] = useState("user@example.com");

//   const handleLogout = async () => {
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       if (!token) throw new Error("Token not found");

//       await axios.post(
//         `${BASE_URL}/api/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       await logout(); // hapus token dari storage
//       await AsyncStorage.removeItem("auth_user"); // menghapus data user dari AsyncStorage

//       // navigation.navigate("Login");
//       // navigation.reset({
//       //   index: 0,
//       //   routes: [{ name: "Login" }],
//       // });
//     } catch (error) {
//       console.error("Logout error:", error.message);
//       Alert.alert("Logout Gagal", "Terjadi kesalahan saat logout.");
//     }
//   };

//   const handlePress = (action) => {
//     if (action === "Logout") {
//       Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin logout?", [
//         { text: "Batal", style: "cancel" },
//         { text: "Logout", style: "destructive", onPress: handleLogout },
//       ]);
//     } else {
//       console.log(`${action} pressed`);
//     }
//   };

//   const loadUser = async () => {
//     try {
//       const userData = await AsyncStorage.getItem("auth_user");
//       if (userData) {
//         const user = JSON.parse(userData);
//         setUserEmail(user.email || "guest@example.com");
//       }
//     } catch (err) {
//       console.error("Gagal load user:", err);
//     }
//   };

//   useEffect(() => {
//     loadUser(); // ambil user dari async storage

//     const interval = setInterval(() => {
//       loadUser();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView contentContainerStyle={{ alignItems: "center" }}>
//         {/* Profile Image */}
//         <Image
//           source={require("../assets/profile.png")}
//           className="mt-0 mb-3 border-2 border-gray-300 rounded-full w-28 h-28"
//         />

//         {/* Email */}
//         <Text className="mb-6 text-base text-gray-600">{userEmail}</Text>

//         {/* Settings Menu */}
//         <View className="w-[90%]">
//           <Text className="mb-3 text-lg font-bold text-gray-800">Settings</Text>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => navigation.navigate("EditProfileScreen")}
//           >
//             <Ionicons name="person-outline" size={20} color="#555" />
//             <Text className="ml-3 text-base text-gray-800">Edit Profile</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => navigation.navigate("EditPasswordScreen")}
//           >
//             <Ionicons name="lock-closed-outline" size={20} color="#555" />
//             <Text className="ml-3 text-base text-gray-800">Edit Password</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => navigation.navigate("FavoriteScreen")}
//           >
//             <Ionicons name="heart-outline" size={20} color="#555" />
//             <Text className="ml-3 text-base text-gray-800">Favorite</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="flex-row items-center py-3 border-b border-gray-200"
//             onPress={() => handlePress("Logout")}
//           >
//             <Ionicons name="log-out-outline" size={20} color="#d00" />
//             <Text className="ml-3 text-base text-red-600">Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../api/responseUrl";

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [profileImage, setProfileImage] = useState(null); // URL gambar dari server

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("auth_user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserEmail(user.email || "guest@example.com");
        if (user.profile_image) {
          setProfileImage(`${BASE_URL}/storage/profile_images/${user.profile_image}`);
        }
      }
    } catch (err) {
      console.error("Gagal load user:", err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) throw new Error("Token not found");

      await axios.post(`${BASE_URL}/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      await logout();
      await AsyncStorage.removeItem("auth_user");
    } catch (error) {
      console.error("Logout error:", error.message);
      Alert.alert("Logout Gagal", "Terjadi kesalahan saat logout.");
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return Alert.alert("Izin ditolak", "Akses galeri dibutuhkan untuk mengunggah foto.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (image) => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const formData = new FormData();

      formData.append("profile_image", {
        uri: image.uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      const res = await axios.post(
        `${BASE_URL}/api/user/update-profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      const imageUrl = `${BASE_URL}/storage/profile_images/${res.data.profile_image}`;
      setProfileImage(imageUrl);

      // Perbarui juga AsyncStorage
      const userData = await AsyncStorage.getItem("auth_user");
      if (userData) {
        const user = JSON.parse(userData);
        user.profile_image = res.data.profile_image;
        await AsyncStorage.setItem("auth_user", JSON.stringify(user));
      }

      Alert.alert("Berhasil", "Foto profil berhasil diperbarui.");
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Gagal", "Terjadi kesalahan saat mengunggah gambar.");
    }
  };

  const handlePress = (action) => {
    if (action === "Logout") {
      Alert.alert("Konfirmasi Logout", "Apakah Anda yakin ingin logout?", [
        { text: "Batal", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: handleLogout },
      ]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {/* Profile Image with upload button */}
        <View className="relative mt-2 mb-3">
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../assets/profile.png")
            }
            className="border-2 border-gray-300 rounded-full w-28 h-28"
          />
          <TouchableOpacity
            onPress={pickImage}
            className="absolute p-1 bg-white border border-gray-300 rounded-full bottom-1 right-1"
          >
            <Ionicons name="camera" size={18} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <Text className="mb-6 text-base text-gray-600">{userEmail}</Text>

        {/* Settings */}
        <View className="w-[90%]">
          <Text className="mb-3 text-lg font-bold text-gray-800">Settings</Text>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200"
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <Ionicons name="person-outline" size={20} color="#555" />
            <Text className="ml-3 text-base text-gray-800">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-3 border-b border-gray-200"
            onPress={() => navigation.navigate("EditPasswordScreen")}
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
