// import React, { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "../api/responseUrl";
// import { AuthContext } from "../context/AuthContext";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext); // ✅ panggil context login

//   const handleLogin = async () => {
//     // 1. Validasi form kosong sebelum request
//     if (!email || !password) {
//       Alert.alert("Login Gagal", "Email dan password wajib diisi.");
//       return;
//     }

//     try {
//       // 2. Kirim permintaan login ke backend
//       const res = await axios.post(`${BASE_URL}/api/login`, {
//         email,
//         password,
//       });

//       // 3. Jika berhasil, simpan token atau user info
//       await login(res.data.token); // Atur context login

//       // Simpan user ke AsyncStorage
//       await AsyncStorage.setItem("auth_user", JSON.stringify(res.data.user));
//       // Navigasi ke halaman Home (pastikan navigator menangani 'Home')
//       // navigation.reset({
//       //   index: 0,
//       //   routes: [{ name: "Home" }],
//       // });

//       navigation.navigate("AppTabs");
//     } catch (error) {
//       // // 4. Tangani error dari backend
//       if (error.response) {
//         const { status, data } = error.response;

//         // Tangani error dari backend: email tidak ditemukan di students
//         if (status === 401 && data.message) {
//           alert(data.message); // => "Anda tidak dapat register..."
//         } else if (status === 409 && data.message) {
//           alert(data.message); // => "Anda tidak dapat register..."
//         } else if (status === 422 && data.errors) {
//           // Tangani validasi Laravel
//           const messages = Object.values(data.errors).flat().join("\n");
//           alert("Gagal daftar:\n" + messages);
//         } else {
//           alert("Gagal daftar. Terjadi kesalahan.");
//         }
//       } else {
//         alert("Gagal daftar. Tidak terhubung ke server.");
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         style={styles.input}
//         onChangeText={setPassword}
//       />
//       <Button title="Login" onPress={handleLogin} />

//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text style={styles.link}>Belum punya akun? Daftar di sini</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, justifyContent: "center" },
//   title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
//   link: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "blue",
//   },
// });

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../api/responseUrl";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Gagal", "Email dan password wajib diisi.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      await login(res.data.token);
      await AsyncStorage.setItem("auth_user", JSON.stringify(res.data.user));
      // navigation.navigate("AppTabs");
      navigation.reset({
        index: 0,
        routes: [{ name: "AppTabs" }],
      });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401 && data.message) {
          alert(data.message);
        } else if (status === 403 && data.message) {
          alert(data.message);
        } else if (status === 409 && data.message) {
          alert(data.message);
        } else if (status === 422 && data.errors) {
          const messages = Object.values(data.errors).flat().join("\n");
          alert("Gagal daftar:\n" + messages);
        } else {
          alert("Gagal daftar. Terjadi kesalahan.");
        }
      } else {
        alert("Gagal daftar. Tidak terhubung ke server.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Login</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Belum punya akun? Daftar di sini</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
  },
});
