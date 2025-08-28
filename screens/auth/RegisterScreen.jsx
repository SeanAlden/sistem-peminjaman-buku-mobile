// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import axios from "axios";
// import { BASE_URL } from "../api/responseUrl";

// export default function RegisterScreen({ navigation }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     password_confirmation: "",
//   });

//   const handleChange = (name, value) => {
//     setForm({ ...form, [name]: value });
//   };

//   // const handleRegister = async () => {
//   //   try {
//   //     await axios.post(`${BASE_URL}/api/register`, form);
//   //     alert("Pendaftaran berhasil. Silakan login.");
//   //     navigation.navigate("Login");
//   //   } catch (error) {
//   //     // catch (error) {
//   //     //   alert("Gagal daftar. Pastikan data benar.");
//   //     // }
//   //     if (error.response && error.response.data && error.response.data.errors) {
//   //       const errors = error.response.data.errors;
//   //       const messages = Object.values(errors).flat().join("\n");
//   //       alert("Gagal daftar:\n" + errors);
//   //     } else {
//   //       alert("Gagal daftar. Terjadi kesalahan server.");
//   //     }
//   //   }
//   // };

//   const handleRegister = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/register`, form);
//       alert("Pendaftaran berhasil. Silakan login.");
//       navigation.navigate("Login");
//     } catch (error) {
//       if (error.response) {
//         const { status, data } = error.response;

//         // Tangani error dari backend: email tidak ditemukan di students
//         if (status === 403 && data.message) {
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
//       <Text style={styles.title}>Register</Text>
//       {["name", "email", "phone", "password", "password_confirmation"].map(
//         (field) => (
//           <TextInput
//             key={field}
//             placeholder={field.replace("_", " ")}
//             secureTextEntry={field.includes("password")}
//             style={styles.input}
//             onChangeText={(text) => handleChange(field, text)}
//             autoCapitalize="none"
//           />
//         )
//       )}
//       <Button title="Register" onPress={handleRegister} />
//       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <Text style={styles.link}>Sudah punya akun? Login</Text>
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

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${BASE_URL}/api/register`, form);
      alert("Pendaftaran berhasil. Silakan login.");
      navigation.navigate("Login");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 403 && data.message) {
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
          <Text style={styles.title}>Register</Text>
          {["name", "email", "phone", "password", "password_confirmation"].map(
            (field) => (
              <TextInput
                key={field}
                placeholder={field.replace("_", " ")}
                secureTextEntry={field.includes("password")}
                style={styles.input}
                onChangeText={(text) => handleChange(field, text)}
                autoCapitalize="none"
              />
            )
          )}
          <Button title="Register" onPress={handleRegister} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Sudah punya akun? Login</Text>
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
