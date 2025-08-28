import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";

export default function VerificationCodeScreen({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");

  const verifyCode = async () => {
    try {
      await axios.post(`${BASE_URL}/api/verify-code`, { email, code });
      Alert.alert("Berhasil", "Kode berhasil diverifikasi");
      navigation.navigate("ResetPassword", { email });
    } catch (error) {
      Alert.alert("Gagal", error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kode Verifikasi</Text>
      <TextInput
        placeholder="Masukkan kode dari email"
        style={styles.input}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <Button title="Verifikasi Kode" onPress={verifyCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
