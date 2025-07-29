// import React from "react";
// import { View, Text, Image, Button, ScrollView } from "react-native";

// export default function BookDetailScreen({ route }) {
//   const { book } = route.params;

//   return (
//     <ScrollView style={{ padding: 16 }}>
//       <Image
//         source={{ uri: book.image_url }}
//         style={{ width: "100%", height: 250, borderRadius: 8 }}
//         resizeMode="cover"
//       />
//       <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>{book.title}</Text>
//       <Text style={{ fontSize: 18, color: "#666", marginBottom: 8 }}>by {book.author}</Text>
//       <Text style={{ marginBottom: 10 }}>{book.description}</Text>
//       <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
//         Durasi Pinjam: {book.loan_duration} hari
//       </Text>
//       <Button title="Pinjam Buku" onPress={() => alert("Fitur pinjam coming soon")} />
//     </ScrollView>
//   );
// }

// screens/BookDetailScreen.jsx
// import React from "react";
// import { View, Text, Image, StyleSheet, ScrollView, Button } from "react-native";

// export default function BookDetailScreen({ route }) {
//   const { book } = route.params;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{ uri: book.image_url }} style={styles.image} />
//       <Text style={styles.title}>{book.title}</Text>
//       <Text style={styles.author}>by {book.author}</Text>
//       <Text style={styles.description}>{book.description}</Text>
//       <Text style={styles.duration}>Durasi Pinjam: {book.loan_duration} hari</Text>

//       <Button title="Pinjam Buku" onPress={() => alert("Fitur pinjam coming soon")} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     resizeMode: "cover",
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   author: {
//     fontSize: 18,
//     color: "gray",
//     marginVertical: 4,
//   },
//   description: {
//     fontSize: 16,
//     marginVertical: 12,
//     lineHeight: 22,
//   },
//   duration: {
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
// });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Button,
//   Modal,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import { BASE_URL } from "../api/responseUrl";

// export default function BookDetailScreen({ route }) {
//   const { book } = route.params;

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDuration, setSelectedDuration] = useState(1);

//   const maxDuration = book.loan_duration;

//   const handleLoan = async () => {
//     try {
//       const today = new Date();
//       const returnDate = new Date(today);
//       returnDate.setDate(today.getDate() + selectedDuration);

//       const loanData = {
//         book_id: book.id,
//         loan_date: today.toISOString().split("T")[0],
//         return_date: returnDate.toISOString().split("T")[0],
//       };

//       const response = await axios.post(`${BASE_URL}/api/loans`, loanData);

//       if (response.data.success) {
//         Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
//         setModalVisible(false);
//       } else {
//         Alert.alert("Gagal", response.data.message || "Terjadi kesalahan.");
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Terjadi kesalahan pada server.");
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{ uri: book.image_url }} style={styles.image} />
//       <Text style={styles.title}>{book.title}</Text>
//       <Text style={styles.author}>by {book.author}</Text>
//       <Text style={styles.description}>{book.description}</Text>
//       <Text style={styles.duration}>Durasi Maksimal: {book.loan_duration} hari</Text>
//       <Text style={styles.stock}>Stok Tersedia: {book.stock}</Text>

//       <Button title="Pinjam Buku" onPress={() => setModalVisible(true)} />

//       {/* Modal Durasi */}
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//               Pilih Durasi Pinjam
//             </Text>
//             <Picker
//               selectedValue={selectedDuration}
//               onValueChange={(itemValue) => setSelectedDuration(itemValue)}
//               style={{ width: "100%", marginTop: 10 }}
//             >
//               {[...Array(maxDuration).keys()].map((i) => (
//                 <Picker.Item key={i + 1} label={`${i + 1} hari`} value={i + 1} />
//               ))}
//             </Picker>
//             <View style={{ flexDirection: "row", marginTop: 20, gap: 10 }}>
//               <Button title="Batal" color="gray" onPress={() => setModalVisible(false)} />
//               <Button title="Pinjam Sekarang" onPress={handleLoan} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     resizeMode: "contain",
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   author: {
//     fontSize: 18,
//     color: "gray",
//     marginVertical: 4,
//   },
//   description: {
//     fontSize: 16,
//     marginVertical: 12,
//     lineHeight: 22,
//   },
//   duration: {
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   stock: {
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "#000000aa",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Modal,
  Alert,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { BASE_URL } from "../api/responseUrl";

export default function BookDetailScreen({ route }) {
  const { book } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1);

  const [imageError, setImageError] = useState(false);

  const maxDuration = book.loan_duration;

  // const handleLoan = async () => {
  //   try {
  //     const today = new Date();
  //     const returnDate = new Date(today);
  //     returnDate.setDate(today.getDate() + selectedDuration);

  //     const loanData = {
  //       book_id: book.id,
  //       loan_date: today.toISOString().split("T")[0],
  //       return_date: returnDate.toISOString().split("T")[0],
  //     };

  //     const response = await axios.post(`${BASE_URL}/api/loans`, loanData);

  //     if (response.data.success) {
  //       Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
  //       setModalVisible(false);
  //     } else {
  //       Alert.alert("Gagal", response.data.message || "Terjadi kesalahan.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     Alert.alert("Error", "Terjadi kesalahan pada server.");
  //   }
  // };

  async function handleLoan() {
    try {
      const today = new Date();
      const returnDate = new Date(today);
      returnDate.setDate(today.getDate() + selectedDuration);

      const loanData = {
        book_id: book.id,
        loan_date: today.toISOString().split("T")[0],
        return_date: returnDate.toISOString().split("T")[0],
      };

      const response = await axios.post(`${BASE_URL}/api/loans`, loanData);

      if (response.data.success) {
        Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
        setModalVisible(false);
      } else {
        Alert.alert("Gagal", response.data.message || "Terjadi kesalahan.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Terjadi kesalahan pada server.");
    }
  }

  return (
    <ScrollView
      className="flex-1 px-4 py-0 bg-white"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Image
        source={
          !book.image_url && book.image_url.trim() !== "" || imageError
            ? require("../assets/avatar.png") // gambar default lokal
            : { uri: book.image_url }
        }
        className="w-full h-64 mb-4 rounded-xl"
        resizeMode="contain"
        onError={() => setImageError(true)}
      />
      <Text className="text-2xl font-bold text-gray-800">{book.title}</Text>
      <Text className="mt-1 mb-4 text-lg text-gray-500">by {book.author}</Text>
      <Text className="mb-4 text-base leading-6 text-gray-700">
        {book.description}
      </Text>
      <Text className="mb-1 font-semibold">
        Durasi Maksimal: {book.loan_duration} hari
      </Text>
      <Text className="mb-4 font-semibold">Stok Tersedia: {book.stock}</Text>

      {/* <Button title="Pinjam Buku" o
      nPress={() => setModalVisible(true)} /> */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="py-3 mb-1 bg-green-600 rounded-lg"
      >
        <Text className="font-semibold text-center text-white">
          Pinjam Buku
        </Text>
      </Pressable>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="items-center justify-center flex-1 bg-black/50">
          <View className="w-4/5 p-6 bg-white rounded-xl">
            <Text className="mb-3 text-lg font-bold text-center">
              Pilih Durasi Pinjam
            </Text>
            <Picker
              selectedValue={selectedDuration}
              onValueChange={(itemValue) => setSelectedDuration(itemValue)}
              style={{ width: "100%" }}
            >
              {[...Array(maxDuration).keys()].map((i) => (
                <Picker.Item
                  key={i + 1}
                  label={`${i + 1} hari`}
                  value={i + 1}
                />
              ))}
            </Picker>

            <View className="flex-row justify-between mt-5">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                <Text className="font-semibold text-gray-700">Batal</Text>
              </Pressable>

              <Pressable
                onPress={handleLoan}
                className="px-4 py-2 bg-blue-600 rounded-md"
              >
                <Text className="font-semibold text-white">
                  Pinjam Sekarang
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
