import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";

export default function ResetPasswordScreen({ route, navigation }) {
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert("Error", "Password minimal 8 karakter");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/reset-password`, {
        email,
        new_password: newPassword,
      });
      Alert.alert("Berhasil", "Password berhasil diubah");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Gagal", error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Password baru"
        secureTextEntry
        style={styles.input}
        onChangeText={setNewPassword}
      />
      <Button title="Simpan Password Baru" onPress={resetPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
