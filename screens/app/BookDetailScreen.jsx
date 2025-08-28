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

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Button,
//   Modal,
//   Alert,
//   Pressable,
//   SafeAreaView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import { BASE_URL } from "../../api/responseUrl";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function BookDetailScreen({ route }) {
//   const { book } = route.params;
//   const [bookData, setBookData] = useState(book);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDuration, setSelectedDuration] = useState(1);

//   const [imageError, setImageError] = useState(false);
//   // const [isBorrowed, setIsBorrowed] = useState(false);
//   const [isBorrowed, setIsBorrowed] = useState(book.is_borrowed);

//   const maxDuration = book.loan_duration;

//   // const handleLoan = async () => {
//   //   try {
//   //     const today = new Date();
//   //     const returnDate = new Date(today);
//   //     returnDate.setDate(today.getDate() + selectedDuration);

//   //     const loanData = {
//   //       book_id: book.id,
//   //       loan_date: today.toISOString().split("T")[0],
//   //       return_date: returnDate.toISOString().split("T")[0],
//   //     };

//   //     const response = await axios.post(`${BASE_URL}/api/loans`, loanData);

//   //     if (response.data.success) {
//   //       Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
//   //       setModalVisible(false);
//   //     } else {
//   //       Alert.alert("Gagal", response.data.message || "Terjadi kesalahan.");
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //     Alert.alert("Error", "Terjadi kesalahan pada server.");
//   //   }
//   // };

//   async function handleLoan() {
//     try {
//       const token = await AsyncStorage.getItem("auth_token"); // ambil token dari penyimpanan
//       const today = new Date();
//       const returnDate = new Date(today);
//       returnDate.setDate(today.getDate() + selectedDuration);

//       const loanData = {
//         book_id: book.id,
//         loan_date: today.toISOString().split("T")[0],
//         return_date: returnDate.toISOString().split("T")[0],
//       };

//       const response = await axios.post(`${BASE_URL}/api/loans`, loanData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
//         setIsBorrowed(true); // update tombol jadi "Sudah Dipinjam"
//         setModalVisible(false);
//         fetchBookDetail(); // ← fetch ulang data agar stok ter-update
//       } else {
//         Alert.alert("Gagal", response.data.message || "Terjadi kesalahan.");
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", "Terjadi kesalahan pada server.");
//     }
//   }

//   const fetchBookDetail = async () => {
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       const response = await axios.get(`${BASE_URL}/api/books/${book.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       setBookData(response.data.data);
//     } catch (error) {
//       console.error("Gagal memuat data buku:", error);
//     }
//   };

//   // async function checkIfBookIsBorrowed() {
//   //   try {
//   //     const token = await AsyncStorage.getItem("auth_token");
//   //     const response = await axios.get(`${BASE_URL}/api/loans/check-active`, {
//   //       params: {
//   //         book_id: book.id,
//   //       },
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });

//   //     if (response.data.has_active_loan) {
//   //       setIsBorrowed(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Gagal mengecek status pinjam:", error);
//   //   }
//   // }

//   useEffect(() => {
//     // checkIfBookIsBorrowed();
//     fetchBookDetail();
//   }, []);

//   return (
//     <ScrollView
//       className="flex-1 px-4 py-0 bg-white"
//       showsVerticalScrollIndicator={false}
//       showsHorizontalScrollIndicator={false}
//     >
//       <Image
//         source={
//           (!bookData.image_url && bookData.image_url.trim() !== "") ||
//           imageError
//             ? require("../../assets/avatar.png") // gambar default lokal
//             : { uri: bookData.image_url }
//         }
//         className="w-full h-64 mb-4 rounded-xl"
//         resizeMode="contain"
//         onError={() => setImageError(true)}
//       />
//       <Text className="text-2xl font-bold text-gray-800">{bookData.title}</Text>
//       <Text className="mt-1 mb-4 text-lg text-gray-500">
//         by {bookData.author}
//       </Text>
//       <Text className="mb-4 text-base leading-6 text-gray-700">
//         {bookData.description}
//       </Text>
//       <Text className="mb-1 font-semibold">
//         Durasi Maksimal: {bookData.loan_duration} hari
//       </Text>
//       <Text className="mb-4 font-semibold">
//         Stok Tersedia: {bookData.stock}
//       </Text>

//       {/* <Button title="Pinjam Buku" o
//       nPress={() => setModalVisible(true)} /> */}
//       {/* <Pressable
//         onPress={() => setModalVisible(true)}
//         className="py-3 mb-1 bg-green-600 rounded-lg"
//       >
//         <Text className="font-semibold text-center text-white">
//           Pinjam Buku
//         </Text>
//       </Pressable> */}
//       {/* <Pressable
//         onPress={() => setModalVisible(true)}
//         className={`py-3 mb-1 rounded-lg ${isBorrowed ? "bg-gray-400" : "bg-green-600"}`}
//         disabled={isBorrowed}
//       >
//         <Text className="font-semibold text-center text-white">
//           {isBorrowed ? "Sudah Dipinjam" : "Pinjam Buku"}
//         </Text>
//       </Pressable> */}
//       <Pressable
//         onPress={() => !isBorrowed && setModalVisible(true)}
//         className={`py-3 mb-1 rounded-lg ${isBorrowed ? "bg-gray-400" : "bg-green-600"}`}
//         disabled={isBorrowed}
//       >
//         <Text className="font-semibold text-center text-white">
//           {isBorrowed ? "Sudah Dipinjam" : "Pinjam Buku"}
//         </Text>
//       </Pressable>

//       {/* Modal */}
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View className="items-center justify-center flex-1 bg-black/50">
//           <View className="w-4/5 p-6 bg-white rounded-xl">
//             <Text className="mb-3 text-lg font-bold text-center">
//               Pilih Durasi Pinjam
//             </Text>
//             <Picker
//               selectedValue={selectedDuration}
//               onValueChange={(itemValue) => setSelectedDuration(itemValue)}
//               style={{ width: "100%" }}
//             >
//               {[...Array(maxDuration).keys()].map((i) => (
//                 <Picker.Item
//                   key={i + 1}
//                   label={`${i + 1} hari`}
//                   value={i + 1}
//                 />
//               ))}
//             </Picker>

//             <View className="flex-row justify-between mt-5">
//               <Pressable
//                 onPress={() => setModalVisible(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 <Text className="font-semibold text-gray-700">Batal</Text>
//               </Pressable>

//               <Pressable
//                 onPress={handleLoan}
//                 className="px-4 py-2 bg-blue-600 rounded-md"
//               >
//                 <Text className="font-semibold text-white">
//                   Pinjam Sekarang
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Alert,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// // Hapus Modal & Picker karena peminjaman langsung, tidak pilih durasi lagi
// import axios from "axios";
// import { BASE_URL } from "../../api/responseUrl";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function BookDetailScreen({ route, navigation }) {
//   const { bookId } = route.params; // Terima bookId, bukan objek book utuh
//   const [bookData, setBookData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageError, setImageError] = useState(false);

//   // Perubahan: State baru untuk status peminjaman & reservasi
//   const [isBorrowed, setIsBorrowed] = useState(false);
//   const [hasReservation, setHasReservation] = useState(false);
//   const [reservationId, setReservationId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // const fetchBookDetail = async () => {
//   //   try {
//   //     const token = await AsyncStorage.getItem("auth_token");
//   //     const response = await axios.get(`${BASE_URL}/api/books/${bookId}`, {
//   //       // Fetch menggunakan bookId
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });

//   //     // API Book Detail perlu dimodifikasi untuk mengirim status is_borrowed dan has_reservation
//   //     const detailedBook = response.data.data;
//   //     setBookData(detailedBook);
//   //     setIsBorrowed(detailedBook.is_borrowed_by_user);
//   //     setHasReservation(detailedBook.has_active_reservation_by_user);
//   //     setReservationId(detailedBook.active_reservation_id || null);
//   //   } catch (error) {
//   //     console.error("Gagal memuat data buku:", error);
//   //     Alert.alert("Error", "Gagal memuat data buku.");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const fetchBookDetail = async () => {
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       const response = await axios.get(
//         `${BASE_URL}/api/reservations/books/${bookId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const detailedBook = response.data.data;
//       setBookData(detailedBook);
//       setIsBorrowed(detailedBook.is_borrowed_by_user);
//       setHasReservation(detailedBook.has_active_reservation_by_user);
//       setReservationId(detailedBook.active_reservation_id || null); // <- Fix di sini
//     } catch (error) {
//       console.error("Gagal memuat data buku:", error);
//       Alert.alert("Error", "Gagal memuat data buku.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Tambahkan listener untuk refresh saat kembali ke screen ini
//     const unsubscribe = navigation.addListener("focus", () => {
//       setIsLoading(true);
//       fetchBookDetail();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   // Fungsi untuk meminjam buku
//   async function handleLoan() {
//     setIsSubmitting(true);
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       const today = new Date();
//       const returnDate = new Date();
//       returnDate.setDate(today.getDate() + bookData.loan_duration);

//       const response = await axios.post(
//         `${BASE_URL}/api/loans`,
//         {
//           book_id: bookData.id,
//           return_date: returnDate.toISOString().split("T")[0],
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
//         fetchBookDetail(); // Refresh data
//       }
//     } catch (err) {
//       const message =
//         err.response?.data?.message || "Terjadi kesalahan pada server.";
//       Alert.alert("Gagal", message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   // Perubahan: Fungsi baru untuk reservasi buku
//   async function handleReservation() {
//     setIsSubmitting(true);
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       const response = await axios.post(
//         `${BASE_URL}/api/reservations`,
//         { book_id: bookData.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         Alert.alert("Sukses", "Anda berhasil masuk antrian reservasi!");
//         fetchBookDetail(); // Refresh data
//       }
//     } catch (err) {
//       const message =
//         err.response?.data?.message || "Terjadi kesalahan pada server.";
//       Alert.alert("Gagal", message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   // async function handleCancelReservation() {
//   //   if (!reservationId) return;

//   //   setIsSubmitting(true);
//   //   try {
//   //     const token = await AsyncStorage.getItem("auth_token");
//   //     const response = await axios.delete(
//   //       `${BASE_URL}/api/reservations/${reservationId}`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );

//   //     if (response.data.success) {
//   //       Alert.alert("Berhasil", "Reservasi berhasil dibatalkan.");
//   //       fetchBookDetail(); // Refresh data
//   //     }
//   //   } catch (err) {
//   //     const message =
//   //       err.response?.data?.message || "Gagal membatalkan reservasi.";
//   //     Alert.alert("Error", message);
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // }

//   async function handleCancelReservation() {
//     console.log("Reservation ID to cancel:", reservationId); // Tambah log
//     if (!reservationId) return;

//     setIsSubmitting(true);
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       const response = await axios.delete(
//         `${BASE_URL}/api/reservations/${reservationId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       console.log("Response delete:", response.data); // Tambahkan log

//       if (response.data.success) {
//         Alert.alert("Berhasil", "Reservasi berhasil dibatalkan.");
//         fetchBookDetail(); // Refresh data
//       }
//     } catch (err) {
//       console.error(
//         "Error saat cancel reservasi:",
//         err.response?.data || err.message
//       );
//       const message =
//         err.response?.data?.message || "Gagal membatalkan reservasi.";
//       Alert.alert("Error", message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   // Fungsi untuk render tombol dinamis
//   const renderActionButton = () => {
//     if (isBorrowed) {
//       return (
//         <Text className="font-semibold text-center text-white">
//           Sudah Dipinjam
//         </Text>
//       );
//     }
//     if (hasReservation) {
//       return (
//         <Text className="font-semibold text-center text-white">
//           Batalkan Reservasi
//         </Text>
//       );
//     }
//     if (bookData.stock > 0) {
//       return (
//         <Text className="font-semibold text-center text-white">
//           Pinjam Buku
//         </Text>
//       );
//     }
//     return (
//       <Text className="font-semibold text-center text-white">
//         Reservasi & Masuk Antrian
//       </Text>
//     );
//   };

//   // const getButtonAction = () => {
//   //   if (isBorrowed || hasReservation) return null; // No action
//   //   if (bookData.stock > 0) return handleLoan;
//   //   return handleReservation;
//   // };

//   const getButtonAction = () => {
//     if (hasReservation) return handleCancelReservation;
//     if (isBorrowed) return null;
//     if (bookData.stock > 0) return handleLoan;
//     return handleReservation;
//   };

//   if (isLoading) {
//     return (
//       <View className="items-center justify-center flex-1">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!bookData) {
//     return (
//       <View className="items-center justify-center flex-1">
//         <Text>Buku tidak ditemukan.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 px-4 py-0 bg-white">
//       <Image
//         source={
//           (!bookData.image_url && bookData.image_url.trim() !== "") ||
//           imageError
//             ? require("../../assets/avatar.png") // gambar default lokal
//             : { uri: bookData.image_url }
//         }
//         className="w-full h-64 mb-4 rounded-xl"
//         resizeMode="contain"
//         onError={() => setImageError(true)}
//       />
//       <Text className="text-2xl font-bold text-gray-800">{bookData.title}</Text>
//       <Text className="mt-1 mb-4 text-lg text-gray-500">
//         by {bookData.author}
//       </Text>
//       <Text className="mb-4 text-base leading-6 text-gray-700">
//         {bookData.description}
//       </Text>
//       <Text className="mb-1 font-semibold">
//         Durasi Maksimal: {bookData.loan_duration} hari
//       </Text>
//       <Text className="mb-4 font-semibold">
//         Stok Tersedia: {bookData.stock}
//       </Text>

//       {/* <Pressable
//         onPress={getButtonAction()}
//         className={`py-3 mb-1 rounded-lg
//                     ${isBorrowed || hasReservation ? "bg-gray-400" : bookData.stock > 0 ? "bg-green-600" : "bg-orange-500"}`}
//         disabled={isBorrowed || hasReservation || isSubmitting}
//       >
//         {isSubmitting ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           renderActionButton()
//         )}
//       </Pressable> */}
//       {/* <Pressable
//         onPress={getButtonAction}
//         className={`py-3 mb-1 rounded-lg
//               ${isBorrowed || isSubmitting ? "bg-gray-400" : bookData.stock > 0 ? "bg-green-600" : hasReservation ? "bg-red-500" : "bg-orange-500"}`}
//         disabled={isBorrowed || isSubmitting}
//       >
//         {isSubmitting ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           renderActionButton()
//         )}
//       </Pressable> */}
//       <Pressable
//         // onPress={getButtonAction}
//         onPress={() => getButtonAction()?.()}
//         className={`py-3 mb-1 rounded-lg
//     ${
//       isBorrowed || isSubmitting
//         ? "bg-gray-400"
//         : hasReservation
//           ? "bg-red-500"
//           : bookData.stock > 0
//             ? "bg-green-600"
//             : "bg-orange-500"
//     }`}
//         disabled={isBorrowed || isSubmitting}
//         // disabled={isSubmitting}
//       >
//         {isSubmitting ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           renderActionButton()
//         )}
//       </Pressable>

//       {/* {hasReservation && bookData.reservation_status === "available" ? (
//         <View className="flex-row justify-between space-x-2">
//           <Pressable
//             onPress={handleCancelReservation}
//             className="flex-1 py-3 mb-1 bg-red-500 rounded-lg"
//             disabled={isSubmitting}
//           >
//             <Text className="font-semibold text-center text-white">
//               Batalkan Reservasi
//             </Text>
//           </Pressable>
//           <Pressable
//             onPress={handleLoan}
//             className="flex-1 py-3 mb-1 bg-green-600 rounded-lg"
//             disabled={isSubmitting}
//           >
//             <Text className="font-semibold text-center text-white">
//               Pinjam Buku
//             </Text>
//           </Pressable>
//         </View>
//       ) : (
//         // fallback tombol lama
//         <Pressable
//           onPress={() => getButtonAction()?.()}
//           className={`py-3 mb-1 rounded-lg ${
//             isBorrowed || isSubmitting
//               ? "bg-gray-400"
//               : hasReservation
//                 ? "bg-red-500"
//                 : bookData.stock > 0
//                   ? "bg-green-600"
//                   : "bg-orange-500"
//           }`}
//           disabled={isBorrowed || isSubmitting}
//         >
//           {isSubmitting ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             renderActionButton()
//           )}
//         </Pressable>
//       )} */}
//     </ScrollView>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookDetailScreen({ route, navigation }) {
  const { bookId } = route.params;
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [isBorrowed, setIsBorrowed] = useState(false);
  const [hasReservation, setHasReservation] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [reservationStatus, setReservationStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const fetchBookDetail = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("auth_token");
  //     const response = await axios.get(
  //       `${BASE_URL}/api/reservations/books/${bookId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     const detailedBook = response.data.data;
  //     setBookData(detailedBook);

  //     setIsBorrowed(detailedBook.is_borrowed_by_user);
  //     setHasReservation(detailedBook.has_active_reservation_by_user);
  //     setReservationId(detailedBook.active_reservation_id || null);
  //     setReservationStatus(detailedBook.active_reservation_status || null); // status reservasi
  //   } catch (error) {
  //     console.error("Gagal memuat data buku:", error);
  //     Alert.alert("Error", "Gagal memuat data buku.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchBookDetail = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      // --- PERBAIKAN: Panggil endpoint yang BENAR ---
      const response = await axios.get(
        `${BASE_URL}/api/book-details/${bookId}`, // Menggunakan route baru yang sudah kita buat
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const detailedBook = response.data.data;
      setBookData(detailedBook);

      setIsBorrowed(detailedBook.is_borrowed_by_user);
      setHasReservation(detailedBook.has_active_reservation_by_user);
      setReservationId(detailedBook.active_reservation_id || null);
      setReservationStatus(detailedBook.active_reservation_status || null);
    } catch (error) {
      console.error("Gagal memuat data buku:", error);
      Alert.alert("Error", "Gagal memuat data buku.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      fetchBookDetail();
    });
    return unsubscribe;
  }, [navigation]);

  async function handleLoan() {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const today = new Date();
      const returnDate = new Date();
      returnDate.setDate(today.getDate() + bookData.loan_duration);

      const response = await axios.post(
        `${BASE_URL}/api/loans`,
        {
          book_id: bookData.id,
          return_date: returnDate.toISOString().split("T")[0],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Alert.alert("Sukses", "Peminjaman berhasil dilakukan!");
        fetchBookDetail();
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Terjadi kesalahan pada server.";
      Alert.alert("Gagal", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReservation() {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.post(
        `${BASE_URL}/api/reservations`,
        { book_id: bookData.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Alert.alert("Sukses", "Anda berhasil masuk antrian reservasi!");
        fetchBookDetail();
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Terjadi kesalahan pada server.";
      Alert.alert("Gagal", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCancelReservation() {
    if (!reservationId) return;

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const response = await axios.delete(
        `${BASE_URL}/api/reservations/${reservationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Alert.alert("Berhasil", "Reservasi berhasil dibatalkan.");
        fetchBookDetail();
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Gagal membatalkan reservasi.";
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!bookData) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Buku tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 px-4 py-0 bg-white">
      <Image
        source={
          (!bookData.image_url && bookData.image_url.trim() !== "") ||
          imageError
            ? require("../../assets/avatar.png")
            : { uri: bookData.image_url }
        }
        className="w-full h-64 mb-4 rounded-xl"
        resizeMode="contain"
        onError={() => setImageError(true)}
      />
      <Text className="text-2xl font-bold text-gray-800">{bookData.title}</Text>
      <Text className="mt-1 mb-4 text-lg text-gray-500">
        by {bookData.author}
      </Text>
      <Text className="mb-4 text-base leading-6 text-gray-700">
        {bookData.description}
      </Text>
      <Text className="mb-1 font-semibold">
        Durasi Maksimal: {bookData.loan_duration} hari
      </Text>
      <Text className="mb-4 font-semibold">
        Stok Tersedia: {bookData.stock}
      </Text>

      {/* {hasReservation && reservationStatus === "available" ? (
        <View className="flex-row justify-between space-x-2">
          <Pressable
            onPress={handleCancelReservation}
            className="flex-1 py-3 mb-1 bg-red-500 rounded-lg"
            disabled={isSubmitting}
          >
            <Text className="font-semibold text-center text-white">
              Batalkan Reservasi
            </Text>
          </Pressable>
          <Pressable
            onPress={handleLoan}
            className="flex-1 py-3 mb-1 bg-green-600 rounded-lg"
            disabled={isSubmitting}
          >
            <Text className="font-semibold text-center text-white">
              Pinjam Buku
            </Text>
          </Pressable>
        </View> */}

      {/* {hasReservation && reservationStatus === "available" ? (
        <View className="flex-row justify-between space-x-2">
          <Pressable
            onPress={handleCancelReservation}
            className="flex-1 py-3 mb-1 bg-red-500 rounded-lg"
            disabled={isSubmitting}
          >
            <Text className="font-semibold text-center text-white">
              Batalkan Reservasi
            </Text>
          </Pressable>

          {bookData.stock > 0 && (
            <Pressable
              onPress={handleLoan}
              className="flex-1 py-3 mb-1 bg-green-600 rounded-lg"
              disabled={isSubmitting}
            >
              <Text className="font-semibold text-center text-white">
                Pinjam Buku
              </Text>
            </Pressable>
          )}
        </View> */}

      {hasReservation && reservationStatus === "available" ? (
        <View className="flex-row justify-between space-x-2">
          <Pressable
            onPress={handleCancelReservation}
            className="flex-1 py-3 mb-1 bg-red-500 rounded-lg"
            disabled={isSubmitting}
          >
            <Text className="font-semibold text-center text-white">
              Batalkan Reservasi
            </Text>
          </Pressable>

          {bookData.stock > 0 && (
            <Pressable
              onPress={handleLoan}
              className="flex-1 py-3 mb-1 bg-green-600 rounded-lg"
              disabled={isSubmitting}
            >
              <Text className="font-semibold text-center text-white">
                Pinjam Buku
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        <Pressable
          onPress={() => {
            if (hasReservation) return handleCancelReservation();
            if (isBorrowed) return;
            if (bookData.stock > 0) return handleLoan();
            return handleReservation();
          }}
          className={`py-3 mb-1 rounded-lg ${
            isBorrowed || isSubmitting
              ? "bg-gray-400"
              : hasReservation
                ? "bg-red-500"
                : bookData.stock > 0
                  ? "bg-green-600"
                  : "bg-orange-500"
          }`}
          disabled={isBorrowed || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="font-semibold text-center text-white">
              {isBorrowed
                ? "Sudah Dipinjam"
                : hasReservation
                  ? "Batalkan Reservasi"
                  : bookData.stock > 0
                    ? "Pinjam Buku"
                    : "Reservasi & Masuk Antrian"}
            </Text>
          )}
        </Pressable>
      )}
    </ScrollView>
  );
}
