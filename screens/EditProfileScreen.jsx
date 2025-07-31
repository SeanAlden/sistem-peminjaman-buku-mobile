import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../api/responseUrl";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("auth_user");
      if (userData) {
        const user = JSON.parse(userData);
        setName(user.name || "");
        setEmail(user.email || "");
      }
    } catch (error) {
      console.error("Gagal mengambil user:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleUpdate = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Nama dan email tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("auth_token");

      const response = await axios.put(
        `${BASE_URL}/api/user/update`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Simpan kembali user baru ke AsyncStorage
      await AsyncStorage.setItem("auth_user", JSON.stringify(response.data.user));

      Alert.alert("Sukses", "Profil berhasil diperbarui.");
      navigation.goBack();
    } catch (err) {
      console.error("Update profile error:", err.response?.data || err.message);
      Alert.alert("Gagal", "Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <Text className="mt-4 mb-4 text-xl font-bold">Edit Profil</Text>

      <TextInput
        placeholder="Nama"
        value={name}
        onChangeText={setName}
        className="px-4 py-3 mb-4 border border-gray-300 rounded-lg"
      />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="px-4 py-3 mb-6 border border-gray-300 rounded-lg"
      />

      <TouchableOpacity
        onPress={handleUpdate}
        className="p-3 mb-3 text-center bg-orange-500 rounded-xl"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-semibold text-center text-white">Simpan</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
