// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import { BASE_URL } from "../api/studentApi";

// export default function HomeScreen() {
//   const [categories, setCategories] = useState([]);
//   const [books, setBooks] = useState([]);

//   const fetchData = async () => {
//     try {
//       const categoryResponse = await fetch(
//         `${BASE_URL}/categories`
//       );
//       const bookResponse = await fetch(`${BASE_URL}/books`);
//       const categoryData = await categoryResponse.json();
//       const bookData = await bookResponse.json();

//       if (categoryData.success) setCategories(categoryData.data);
//       if (bookData.success) setBooks(bookData.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderCategory = ({ item }) => (
//     <View style={styles.card}>
//       <Image
//         source={require("../assets/default-category.png")}
//         style={styles.image}
//       />
//       <Text style={styles.title}>{item.name}</Text>
//     </View>
//   );

//   const renderBook = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: item.image_url }} style={styles.image} />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.subtitle}>{item.author}</Text>
//     </View>
//   );

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#f5f5f5",
//     },
// header: {
//   flexDirection: "row",
//   alignItems: "center",
//   padding: 16,
//   backgroundColor: "white",
// },
// profile: {
//   width: 40,
//   height: 40,
//   borderRadius: 20,
//   marginRight: 12,
// },
// username: {
//   fontSize: 18,
//   fontWeight: "bold",
// },
// section: {
//   fontSize: 20,
//   fontWeight: "bold",
//   marginHorizontal: 16,
//   marginTop: 20,
//   marginBottom: 10,
// },
//     card: {
//       backgroundColor: "white",
//       borderRadius: 8,
//       padding: 10,
//       marginHorizontal: 8,
//       alignItems: "center",
//       width: 120,
//     },
//     image: {
//       width: 100,
//       height: 100,
//       resizeMode: "cover",
//       borderRadius: 8,
//       marginBottom: 8,
//     },
//     title: {
//       fontWeight: "bold",
//       fontSize: 14,
//       textAlign: "center",
//     },
//     subtitle: {
//       fontSize: 12,
//       color: "gray",
//       textAlign: "center",
//     },
//     footer: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       paddingVertical: 12,
//       borderTopWidth: 1,
//       borderTopColor: "#e0e0e0",
//       backgroundColor: "white",
//     },
//     navItem: {
//       fontSize: 14,
//       color: "#333",
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image
//           source={require("../assets/profile.png")}
//           style={styles.profile}
//         />
//         <Text style={styles.username}>Hi, Guest</Text>
//       </View>

//       {/* Categories */}
//       <Text style={styles.section}>Categories</Text>
//       <FlatList
//         horizontal
//         data={categories}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderCategory}
//         showsHorizontalScrollIndicator={false}
//       />

//       {/* Books */}
//       <Text style={styles.section}>Books</Text>
//       <FlatList
//         data={books}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderBook}
//       />

//       {/* Footer Navigation */}
//       {/* <View style={styles.footer}>
//         {["Home", "Loan", "Notification", "Profile"].map((label) => (
//           <TouchableOpacity key={label}>
//             <Text style={styles.navItem}>{label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View> */}
//     </SafeAreaView>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   SafeAreaView, // Tetap gunakan SafeAreaView untuk area aman
// } from "react-native";
// import { BASE_URL } from "../api/studentApi";

// export default function HomeScreen() {
//   const [categories, setCategories] = useState([]);
//   const [books, setBooks] = useState([]);

//   const fetchData = async () => {
//     try {
//       const categoryResponse = await fetch(`${BASE_URL}/categories`);
//       const bookResponse = await fetch(`${BASE_URL}/books`);
//       const categoryData = await categoryResponse.json();
//       const bookData = await bookResponse.json();

//       if (categoryData.success) setCategories(categoryData.data);
//       if (bookData.success) setBooks(bookData.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderCategory = ({ item }) => (
//     <View style={styles.categoryCard}>
//       <Image
//         source={require("../assets/default-category.png")}
//         style={styles.categoryImage}
//       />
//       <Text style={styles.title}>{item.name}</Text>
//     </View>
//   );

//   const renderBook = ({ item }) => (
//     <View style={styles.bookCard}>
//       <Image source={{ uri: item.image_url }} style={styles.bookImage} />
//       <Text style={styles.title} numberOfLines={1}>
//         {item.title}
//       </Text>
//       <Text style={styles.subtitle}>{item.author}</Text>
//     </View>
//   );

//   // DIHAPUS: Style tidak lagi didefinisikan di dalam komponen
//   // const styles = StyleSheet.create({...});

//   return (
//     // DIUBAH: SafeAreaView membungkus FlatList utama untuk performa lebih baik
//     <SafeAreaView style={styles.container}>
//       {/* DIHAPUS: Header "Hi, Guest" dipindahkan ke navigator */}
//       <View style={styles.header}>
//         <Image
//           source={require("../assets/profile.png")}
//           style={styles.profile}
//         />
//         <Text style={styles.username}>Hi, Guest</Text>
//       </View>
//       <FlatList
//         ListHeaderComponent={
//           <>
//             {/* Categories */}
//             <Text style={styles.section}>Categories</Text>
//             <FlatList
//               horizontal
//               data={categories}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={renderCategory}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />

//             {/* Books */}
//             <Text style={styles.section}>Books</Text>
//           </>
//         }
//         data={books}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderBook}
//         // BARU: Mengubah daftar buku menjadi grid 2 kolom
//         numColumns={2}
//         columnWrapperStyle={{
//           justifyContent: "space-between",
//           paddingHorizontal: 16,
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// // BARU: Semua style dipindahkan ke luar komponen dan di-upgrade
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa", // Warna latar lebih lembut
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//   },
//   profile: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   section: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginTop: 24,
//     marginBottom: 12,
//   },
//   // Style untuk card kategori
//   categoryCard: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 12,
//     marginRight: 12, // Jarak antar kategori
//     alignItems: "center",
//     width: 110,
//     // Efek bayangan
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryImage: {
//     width: 60,
//     height: 60,
//     marginBottom: 8,
//   },
//   // Style untuk card buku (dalam grid)
//   bookCard: {
//     flex: 1, // Agar kartu mengisi ruang kolom
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 16, // Jarak vertikal antar baris buku
//     maxWidth: "48%", // Sedikit lebih kecil dari 50% untuk spasi
//     // Efek bayangan
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   bookImage: {
//     width: "100%",
//     height: 150, // Gambar buku lebih tinggi
//     resizeMode: "cover",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 14,
//     textAlign: "center",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity, // BARU
// } from "react-native";
// import { BASE_URL } from "../api/responseUrl";

// // DIUBAH: Menerima prop 'navigation'
// export default function HomeScreen({ navigation }) {
//   const [categories, setCategories] = useState([]);
//   const [books, setBooks] = useState([]);

//   // ... (fetchData dan useEffect tidak berubah)
//   const fetchData = async () => {
//     try {
//       const categoryResponse = await fetch(`${BASE_URL}/api/categories`);
//       const bookResponse = await fetch(`${BASE_URL}/api/books`);
//       const categoryData = await categoryResponse.json();
//       const bookData = await bookResponse.json();

//       if (categoryData.success) setCategories(categoryData.data);
//       if (bookData.success) setBooks(bookData.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderCategory = ({ item }) => (
//     // BARU: Bungkus dengan TouchableOpacity
//     <TouchableOpacity
//       style={styles.categoryCard}
//       onPress={() =>
//         navigation.navigate("CategoryDetail", {
//           categoryId: item.id,
//           categoryName: item.name,
//         })
//       }
//     >
//       <Image
//         source={require("../assets/default-category.png")}
//         style={styles.categoryImage}
//       />
//       <Text style={styles.title}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   // const renderBook = ({ item }) => (
//   //   <View style={styles.bookCard}>
//   //     <Image source={{ uri: item.image_url }} style={styles.bookImage} />
//   //     <Text style={styles.title} numberOfLines={1}>
//   //       {item.title}
//   //     </Text>
//   //     <Text style={styles.subtitle}>{item.author}</Text>
//   //     <Text style={styles.subtitle}>Durasi Pinjam: {item.loan_duration} hari</Text>
//   //   </View>
//   // );

//   const renderBook = ({ item }) => (
//     <TouchableOpacity
//       style={styles.bookCard}
//       onPress={() => navigation.navigate("BookDetail", { book: item })}
//     >
//       <Image source={{ uri: item.image_url }} style={styles.bookImage} />
//       <Text style={styles.title} numberOfLines={1}>
//         {item.title}
//       </Text>
//       <Text style={styles.subtitle}>{item.author}</Text>
//       <Text style={styles.subtitle}>Stok: {item.stock}</Text>
//       <Text style={styles.subtitle}>
//         Durasi Pinjam: {item.loan_duration} hari
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* DIHAPUS: Header "Hi, Guest" karena header dikelola oleh navigator */}
//       <FlatList
//         ListHeaderComponent={
//           <>
//             <View style={styles.header}>
//               <Image
//                 source={require("../assets/profile.png")}
//                 style={styles.profile}
//               />
//               <Text style={styles.username}>Hi, Guest</Text>
//             </View>
//             <Text style={styles.sectionHeader}>Selamat Datang!</Text>
//             <Text style={styles.section}>Categories</Text>
//             <FlatList
//               horizontal
//               data={categories}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={renderCategory}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />
//             <Text style={styles.section}>Books</Text>
//           </>
//         }
//         data={books}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderBook}
//         numColumns={2}
//         columnWrapperStyle={{
//           justifyContent: "space-between",
//           paddingHorizontal: 16,
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   sectionHeader: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginTop: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//   },
//   profile: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   section: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginTop: 24,
//     marginBottom: 12,
//   },
//   categoryCard: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 12,
//     marginRight: 12,
//     alignItems: "center",
//     width: 110,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryImage: {
//     width: 60,
//     height: 60,
//     marginBottom: 8,
//   },
//   bookCard: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 16,
//     maxWidth: "48%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   bookImage: {
//     width: "100%",
//     height: 150,
//     resizeMode: "contain",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 14,
//     textAlign: "center",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import { BASE_URL } from "../api/responseUrl";

// export default function HomeScreen({ navigation }) {
//   const [categories, setCategories] = useState([]);
//   const [books, setBooks] = useState([]);

//   const fetchData = async () => {
//     try {
//       const categoryResponse = await fetch(`${BASE_URL}/api/categories`);
//       const bookResponse = await fetch(`${BASE_URL}/api/books`);
//       const categoryData = await categoryResponse.json();
//       const bookData = await bookResponse.json();

//       if (categoryData.success) setCategories(categoryData.data);
//       if (bookData.success) setBooks(bookData.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       style={styles.categoryCard}
//       onPress={() =>
//         navigation.navigate("CategoryDetail", {
//           categoryId: item.id,
//           categoryName: item.name,
//         })
//       }
//     >
//       <Image
//         source={require("../assets/default-category.png")}
//         style={styles.categoryImage}
//       />
//       <Text style={styles.title}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   const renderBook = ({ item }) => (
//     <TouchableOpacity
//       style={styles.bookCard}
//       onPress={() => navigation.navigate("BookDetail", { book: item })}
//     >
//       <Image source={{ uri: item.image_url }} style={styles.bookImage} />
//       <Text style={styles.title} numberOfLines={1}>
//         {item.title}
//       </Text>
//       <Text style={styles.subtitle}>{item.author}</Text>
//       <Text style={styles.subtitle}>Stok: {item.stock}</Text>
//       <Text style={styles.subtitle}>
//         Durasi Pinjam: {item.loan_duration} hari
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={[]} // Kosongkan data karena semua item ada di header
//         keyExtractor={() => "main-scroll"} // Key statis karena tidak ada item
//         ListHeaderComponent={
//           <>
//             <View style={styles.header}>
//               <Image
//                 source={require("../assets/profile.png")}
//                 style={styles.profile}
//               />
//               <Text style={styles.username}>Hi, Guest</Text>
//             </View>
//             <Text style={styles.sectionHeader}>Selamat Datang!</Text>

//             <Text style={styles.section}>Categories</Text>
//             <FlatList
//               horizontal
//               data={categories}
//               keyExtractor={(item) => `cat-${item.id}`}
//               renderItem={renderCategory}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />

//             <Text style={styles.section}>Books</Text>
//             <FlatList
//               horizontal
//               data={books}
//               keyExtractor={(item) => `book-${item.id}`}
//               renderItem={renderBook}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
//             />
//           </>
//         }
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   sectionHeader: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginTop: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//   },
//   profile: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   section: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginTop: 24,
//     marginBottom: 12,
//   },
//   categoryCard: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 12,
//     marginRight: 12,
//     alignItems: "center",
//     width: 110,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   categoryImage: {
//     width: 60,
//     height: 60,
//     marginBottom: 8,
//   },
//   bookCard: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//     marginRight: 12,
//     width: 160,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   bookImage: {
//     width: "100%",
//     height: 150,
//     resizeMode: "contain",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 14,
//     textAlign: "center",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });

// Kalau dengan NativeWind
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import { BASE_URL } from "../../api/responseUrl";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AntDesign } from "@expo/vector-icons";
// import axios from "axios";

// export default function HomeScreen({ navigation }) {
//   const [categories, setCategories] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [userName, setUserName] = useState("Guest");
//   const [favorites, setFavorites] = useState([]);

//   const [imageError, setImageError] = useState(false);
//   const [profileImage, setProfileImage] = useState(null); // URL gambar dari server
//   // const isValidUrl = item.image_url && item.image_url.trim() !== "";

//   const fetchData = async () => {
//     const token = await AsyncStorage.getItem("auth_token");
//     try {
//       const categoryResponse = await fetch(`${BASE_URL}/api/categories`);
//       const bookResponse = await fetch(`${BASE_URL}/api/books`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       const categoryData = await categoryResponse.json();
//       const bookData = await bookResponse.json();

//       if (categoryData.success) setCategories(categoryData.data);
//       if (bookData.success) setBooks(bookData.data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };

//   const loadUser = async () => {
//     try {
//       const token = await AsyncStorage.getItem("auth_token");

//       if (!token) return;
//       const userData = await AsyncStorage.getItem("auth_user");
//       if (userData) {
//         const user = JSON.parse(userData);
//         setUserName(user.name || "Guest");
//         // if (user.profile_image) {
//         //   setProfileImage(
//         //     `${BASE_URL}/storage/profile_images/${user.profile_image}`
//         //   );
//         // }

//         // Fetch profile image via API
//         const res = await axios.get(`${BASE_URL}/api/user/profile-image`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });

//         const image = res.data.profile_image;

//         if (image) {
//           setProfileImage(`${BASE_URL}/storage/profile_images/${image}`);
//         } else {
//           setProfileImage(null);
//         }
//       } else {
//         console.error("Data user tidak ditemukan");
//       }
//     } catch (err) {
//       console.error("Gagal load user:", err);
//     }
//   };

//   const toggleFavorite = async (bookId) => {
//     const isFavorited = favorites.includes(bookId);
//     const token = await AsyncStorage.getItem("auth_token");
//     try {
//       const response = await fetch(`${BASE_URL}/api/favorites`, {
//         method: isFavorited ? "DELETE" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ book_id: bookId }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setFavorites((prev) =>
//           isFavorited ? prev.filter((id) => id !== bookId) : [...prev, bookId]
//         );
//       }
//     } catch (error) {
//       console.error("Favorite toggle error:", error);
//     }
//   };

//   const fetchFavorites = async () => {
//     const token = await AsyncStorage.getItem("auth_token");
//     const res = await fetch(`${BASE_URL}/api/favorites`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (data.success) {
//       setFavorites(data.data.map((book) => book.id));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     loadUser(); // ambil user dari async storage
//     fetchFavorites();

//     const interval = setInterval(() => {
//       fetchData(); // fetch setiap 10 detik
//       fetchFavorites();
//       loadUser();
//     }, 10000); // 10000ms = 10 detik

//     return () => clearInterval(interval); // bersihkan interval saat unmount
//   }, []);

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("Category Detail", {
//           categoryId: item.id,
//           categoryName: item.name,
//         })
//       }
//       className="mr-3 w-[110px] items-center rounded-xl bg-white p-3 shadow-md"
//     >
//       <Image
//         source={require("../../assets/default-category.png")}
//         className="mb-2 h-[60px] w-[60px]"
//       />
//       <Text className="text-sm font-semibold text-center text-gray-800">
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   // const renderBook = ({ item }) => (
//   //   <TouchableOpacity
//   //     onPress={() => navigation.navigate("BookDetail", { book: item })}
//   //     className="mr-3 w-[160px] rounded-xl bg-white p-3 shadow-md"
//   //   >
//   //     {/* <Image
//   //       source={{ uri: item.image_url }}
//   //       className="mb-2 h-[150px] w-full rounded-lg"
//   //       resizeMode="contain"
//   //     /> */}
//   //     {/* <Image
//   //       source={
//   //         item.image_url
//   //           ? { uri: item.image_url }
//   //           : require("../assets/avatar.png") // Pastikan path sesuai struktur project Anda
//   //       }
//   //       className="mb-2 h-[150px] w-full rounded-lg"
//   //       resizeMode="contain"
//   //     /> */}
//   //     <Image
//   //       source={
//   //         (!item.image_url && item.image_url.trim() !== "") || imageError
//   //           ? require("../assets/avatar.png") // gambar default lokal
//   //           : { uri: item.image_url }
//   //       }
//   //       className="mb-2 h-[150px] w-full rounded-lg"
//   //       resizeMode="contain"
//   //       onError={() => setImageError(true)}
//   //     />
//   //     <Text
//   //       className="text-lg font-bold text-center text-gray-800"
//   //       numberOfLines={1}
//   //     >
//   //       {item.title}
//   //     </Text>
//   //     <Text className="mt-1 text-center text-gray-800 text-sb">
//   //       {item.author}
//   //     </Text>
//   //     <Text
//   //       className="mt-1 text-xs text-center text-gray-500"
//   //       numberOfLines={2}
//   //       ellipsizeMode="tail"
//   //     >
//   //       Deskripsi: {item.description}
//   //     </Text>
//   //     <Text className="mt-1 text-sm text-center text-gray-800">
//   //       Stok: {item.stock}
//   //     </Text>
//   //     {/* <Text className="mt-1 text-xs text-center text-gray-500">
//   //       Durasi Pinjam: {item.description}
//   //     </Text> */}

//   //     <Text className="mt-1 text-xs text-center text-gray-800">
//   //       Durasi Pinjam: {item.loan_duration} hari
//   //     </Text>
//   //   </TouchableOpacity>
//   // );

//   const renderBook = ({ item }) => (
//     // <TouchableOpacity
//     //   onPress={() => navigation.navigate("BookDetail", { book: item })}
//     //   className="mr-3 w-[160px] rounded-xl bg-white p-3 shadow-md"
//     // >

//     <TouchableOpacity
//         onPress={() => navigation.navigate("BookDetail", { bookId: item.id })} // Perubahan: Kirim bookId, bukan seluruh objek book
//         className="mr-3 w-[160px] rounded-xl bg-white p-3 shadow-md"
//     >
//       {/* <Image
//         source={{ uri: item.image_url }}
//         className="mb-2 h-[150px] w-full rounded-lg"
//         resizeMode="contain"
//       /> */}
//       <Image
//         source={
//           (!item.image_url && item.image_url.trim() !== "") ||
//           imageError
//             ? require("../../assets/avatar.png") // sesuaikan path jika berbeda
//             // : { uri: `${BASE_URL}/storage/${item.image_url}` }
//             : { uri: item.image_url }
//         }
//         className="mb-2 h-[150px] w-full rounded-lg"
//         resizeMode="contain"
//         // onError={() => setImageError(true)}
//       />
//       <View className="absolute z-10 right-3 top-3">
//         <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
//           <AntDesign
//             name={favorites.includes(item.id) ? "heart" : "hearto"}
//             size={20}
//             color="red"
//           />
//         </TouchableOpacity>
//       </View>
//       <Text
//         className="text-lg font-bold text-center text-gray-800"
//         numberOfLines={1}
//       >
//         {item.title}
//       </Text>
//       <Text className="mt-1 text-center text-gray-800 text-sb">
//         {item.author}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <FlatList
//         data={[]} // Kosong karena konten ada di header
//         keyExtractor={() => "main-scroll"}
//         ListHeaderComponent={
//           <>
//             {/* Header User */}
//             <View className="flex-row items-center px-4 py-3 bg-white">
//               <Image
//                 source={
//                   profileImage
//                     ? { uri: profileImage }
//                     : require("../../assets/profile.png")
//                 }
//                 className="mr-3 rounded-full h-14 w-14"
//               />
//               <Text className="text-2xl font-bold text-gray-800">
//                 Hi, {userName}
//               </Text>
//             </View>

//             {/* Welcome Text */}
//             <Text className="px-4 mt-5 text-2xl font-bold text-gray-900">
//               Selamat Datang!
//             </Text>

//             {/* Category Section */}
//             <View className="flex-row items-center justify-between px-4 mt-6 mb-3">
//               <Text className="text-xl font-bold text-gray-800">
//                 Categories
//               </Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("CategorySearch")}
//               >
//                 <Text className="text-blue-600 text-sb">Search Category</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               horizontal
//               data={categories}
//               keyExtractor={(item) => `cat-${item.id}`}
//               renderItem={renderCategory}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingHorizontal: 16 }}
//             />

//             {/* Book Section */}
//             <View className="flex-row items-center justify-between px-4 mt-6 mb-3">
//               <Text className="px-4 mt-6 mb-3 text-xl font-bold text-gray-800">
//                 Books
//               </Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("BookSearch")}
//               >
//                 <Text className="text-blue-600 text-sb">Search Book</Text>
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               horizontal
//               data={books}
//               keyExtractor={(item) => `book-${item.id}`}
//               renderItem={renderBook}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{
//                 paddingHorizontal: 16,
//                 paddingBottom: 20,
//               }}
//             />
//           </>
//         }
//       />
//     </SafeAreaView>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { BASE_URL } from "../../api/responseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

// --- PERBAIKAN 1: Buat komponen terpisah untuk kartu buku ---
// Ini memungkinkan setiap gambar mengelola status error-nya sendiri.
const BookCard = ({ item, onNavigate, onToggleFavorite, isFavorited }) => {
  const [hasImageError, setHasImageError] = useState(false);

  // Tentukan sumber gambar berdasarkan URL dan status error
  const imageSource = 
    !item.image_url || hasImageError
      ? require("../../assets/avatar.png") // Gambar lokal jika URL tidak ada atau error
      : { uri: item.image_url };

  return (
    <TouchableOpacity
      onPress={() => onNavigate(item.id)}
      className="mr-3 w-[160px] rounded-xl bg-white p-3 shadow-md"
    >
      <Image
        source={imageSource}
        className="mb-2 h-[150px] w-full rounded-lg bg-gray-200" // Tambahkan bg-gray-200
        resizeMode="contain"
        onError={() => setHasImageError(true)} // Aktifkan onError
      />
      <View className="absolute z-10 right-3 top-3">
        <TouchableOpacity onPress={() => onToggleFavorite(item.id)}>
          <AntDesign
            name={isFavorited ? "heart" : "hearto"}
            size={20}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Text
        className="text-lg font-bold text-center text-gray-800"
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text className="mt-1 text-center text-gray-800 text-sb">
        {item.author}
      </Text>
    </TouchableOpacity>
  );
};


export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [userName, setUserName] = useState("Guest");
  const [favorites, setFavorites] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  // --- Hapus state imageError yang lama karena sudah ditangani di BookCard ---
  // const [imageError, setImageError] = useState(false);

  // ... (Fungsi fetchData, loadUser, toggleFavorite, fetchFavorites tidak berubah) ...
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("auth_token");
    try {
      const categoryResponse = await fetch(`${BASE_URL}/api/categories`);
      const bookResponse = await fetch(`${BASE_URL}/api/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const categoryData = await categoryResponse.json();
      const bookData = await bookResponse.json();

      if (categoryData.success) setCategories(categoryData.data);
      if (bookData.success) setBooks(bookData.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");

      if (!token) return;
      const userData = await AsyncStorage.getItem("auth_user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name || "Guest");
        const res = await axios.get(`${BASE_URL}/api/user/profile-image`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const image = res.data.profile_image;
        if (image) {
          setProfileImage(`${BASE_URL}/storage/profile_images/${image}`);
        } else {
          setProfileImage(null);
        }
      } else {
        console.error("Data user tidak ditemukan");
      }
    } catch (err) {
      console.error("Gagal load user:", err);
    }
  };

  const toggleFavorite = async (bookId) => {
    const isFavorited = favorites.includes(bookId);
    const token = await AsyncStorage.getItem("auth_token");
    try {
      const response = await fetch(`${BASE_URL}/api/favorites`, {
        method: isFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ book_id: bookId }),
      });
      const data = await response.json();
      if (data.success) {
        setFavorites((prev) =>
          isFavorited ? prev.filter((id) => id !== bookId) : [...prev, bookId]
        );
      }
    } catch (error) {
      console.error("Favorite toggle error:", error);
    }
  };

  const fetchFavorites = async () => {
    const token = await AsyncStorage.getItem("auth_token");
    const res = await fetch(`${BASE_URL}/api/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setFavorites(data.data.map((book) => book.id));
    }
  };
  
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
        fetchData();
        loadUser();
        fetchFavorites();
    });
    
    return focusListener;
  }, [navigation]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Category Detail", {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
      className="mr-3 w-[110px] items-center rounded-xl bg-white p-3 shadow-md"
    >
      <Image
        source={require("../../assets/default-category.png")}
        className="mb-2 h-[60px] w-[60px]"
      />
      <Text className="text-sm font-semibold text-center text-gray-800">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        data={[]}
        keyExtractor={() => "main-scroll"}
        ListHeaderComponent={
          <>
            {/* Header User */}
            <View className="flex-row items-center px-4 py-3 bg-white">
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../../assets/profile.png")
                }
                className="mr-3 rounded-full h-14 w-14"
              />
              <Text className="text-2xl font-bold text-gray-800">
                Hi, {userName}
              </Text>
            </View>

            {/* Welcome Text */}
            <Text className="px-4 mt-5 text-2xl font-bold text-gray-900">
              Selamat Datang!
            </Text>

            {/* Category Section */}
            <View className="flex-row items-center justify-between px-4 mt-6 mb-3">
              <Text className="text-xl font-bold text-gray-800">
                Categories
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("CategorySearch")}
              >
                <Text className="text-blue-600 text-sb">Search Category</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={categories}
              keyExtractor={(item) => `cat-${item.id}`}
              renderItem={renderCategory}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />

            {/* Book Section */}
            <View className="flex-row items-center justify-between px-4 mt-6 mb-3">
              <Text className="px-4 mt-6 mb-3 text-xl font-bold text-gray-800">
                Books
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("BookSearch")}
              >
                <Text className="text-blue-600 text-sb">Search Book</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={books}
              keyExtractor={(item) => `book-${item.id}`}
              // --- PERBAIKAN 2: Gunakan komponen BookCard ---
              renderItem={({ item }) => (
                <BookCard
                  item={item}
                  onNavigate={(bookId) => navigation.navigate("BookDetail", { bookId })}
                  onToggleFavorite={toggleFavorite}
                  isFavorited={favorites.includes(item.id)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 20,
              }}
            />
          </>
        }
      />
    </SafeAreaView>
  );
}

