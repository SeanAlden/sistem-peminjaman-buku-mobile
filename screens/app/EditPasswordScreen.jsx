import React, { useState } from "react";
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
import { BASE_URL } from "../../api/responseUrl";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditPasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !passwordConfirmation) {
      Alert.alert("Error", "Semua field wajib diisi.");
      return;
    }

    if (newPassword !== passwordConfirmation) {
      Alert.alert("Error", "Password baru dan konfirmasi tidak cocok.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("auth_token");

      await axios.put(
        `${BASE_URL}/api/user/password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      Alert.alert("Berhasil", "Password berhasil diubah.");
      navigation.goBack();
    } catch (err) {
      console.error("Update password error:", err.response?.data || err.message);
      if (
        err.response?.data?.message === "Current password is incorrect"
      ) {
        Alert.alert("Gagal", "Password lama salah.");
      } else {
        Alert.alert("Gagal", "Gagal mengubah password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <Text className="mt-4 mb-4 text-xl font-bold">Ganti Password</Text>

      <TextInput
        placeholder="Password Saat Ini"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        className="px-4 py-3 mb-4 border border-gray-300 rounded-lg"
      />

      <TextInput
        placeholder="Password Baru"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        className="px-4 py-3 mb-4 border border-gray-300 rounded-lg"
      />

      <TextInput
        placeholder="Konfirmasi Password Baru"
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        className="px-4 py-3 mb-6 border border-gray-300 rounded-lg"
      />

      <TouchableOpacity
        onPress={handlePasswordUpdate}
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
