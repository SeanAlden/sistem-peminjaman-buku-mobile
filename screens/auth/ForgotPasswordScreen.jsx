import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const sendCode = async () => {
    if (!email) return Alert.alert("Error", "Email harus diisi.");
    try {
      await axios.post(`${BASE_URL}/api/forgot-password`, { email });
      Alert.alert("Berhasil", "Kode verifikasi dikirim ke email Anda.");
      navigation.navigate("VerificationCode", { email });
    } catch (error) {
      Alert.alert("Gagal", error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lupa Password</Text>
      <TextInput
        placeholder="Masukkan email Anda"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Kirim Kode Verifikasi" onPress={sendCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
