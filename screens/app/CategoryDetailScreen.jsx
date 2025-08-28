// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
// import { BASE_URL } from '../api/studentApi';

// // Komponen Card Buku yang bisa digunakan ulang
// const BookCard = ({ item }) => (
//   <View style={styles.bookCard}>
//     <Image source={{ uri: item.image_url }} style={styles.bookImage} />
//     <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
//     <Text style={styles.subtitle}>{item.author}</Text>
//   </View>
// );

// export default function CategoryDetailScreen({ route }) {
//   // Mengambil parameter (categoryId dan categoryName) dari navigasi
//   const { categoryId, categoryName } = route.params;

//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategoryDetails = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/categories/${categoryId}`);
//         const data = await response.json();

//         if (data.success) {
//           setBooks(data.data.books); // Ambil array buku dari data
//         } else {
//           setError(data.message || 'Failed to fetch data');
//         }
//       } catch (err) {
//         setError('An error occurred. Please try again.');
//         console.error("Fetch detail error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCategoryDetails();
//   }, [categoryId]); // Jalankan ulang effect jika categoryId berubah

//   if (isLoading) {
//     return <View style={styles.center}><ActivityIndicator size="large" color="#f4511e" /></View>;
//   }

//   if (error) {
//     return <View style={styles.center}><Text>{error}</Text></View>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {books.length > 0 ? (
//         <FlatList
//           data={books}
//           renderItem={({ item }) => <BookCard item={item} />}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={styles.listContainer}
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//         />
//       ) : (
//         <View style={styles.center}>
//           <Text>No books found in this category.</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // Style untuk card buku (mirip dengan di HomeScreen)
//   bookCard: {
//     flex: 1,
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 16,
//     maxWidth: '48%',
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   bookImage: {
//     width: "100%",
//     height: 150,
//     resizeMode: "cover",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 14,
//     textAlign: 'left',
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "gray",
//     textAlign: 'left',
//     marginTop: 4,
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { BASE_URL } from "../api/responseUrl";

// // Komponen Card Buku yang bisa digunakan ulang
// const BookCard = ({ item }) => {
//   const imageUrl = `${BASE_URL}/storage/${item.image_url}`;

//   return (
//     // Kita buat card bisa diklik juga, mungkin untuk halaman detail buku nanti
//     <TouchableOpacity style={styles.bookCard}>
//       <Image
//         source={{ uri: imageUrl }}
//         style={styles.bookImage}
//         // Tambahkan fallback jika gambar gagal dimuat
//         onError={(e) =>
//           console.log("Failed to load image:", imageUrl, e.nativeEvent.error)
//         }
//       />
//       <Text style={styles.title} numberOfLines={2}>
//         {item.title}
//       </Text>
//       <Text style={styles.subtitle}>{item.author}</Text>
//     </TouchableOpacity>
//   );
// };

// export default function CategoryDetailScreen({ route }) {
//   // Mengambil parameter (categoryId dan categoryName) dari navigasi
//   const { categoryId } = route.params;

//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   async function fetchCategoryDetails() {
//     try {
//       const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`);
//       const data = await response.json();

//       if (data.success) {
//         setBooks(data.data.books); // Ambil array buku dari data
//       } else {
//         setError(data.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Fetch detail error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchCategoryDetails();

//     const interval = setInterval(() => {
//       fetchCategoryDetails(); // fetch setiap 10 detik
//     }, 10000); // 10000ms = 10 detik

//     return () => clearInterval(interval); // bersihkan interval saat unmount
//   }, [categoryId]);

//   if (isLoading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#f4511e" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {books.length > 0 ? (
//         <FlatList
//           data={books}
//           renderItem={({ item }) => <BookCard item={item} />}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={styles.listContainer}
//           columnWrapperStyle={{ justifyContent: "space-between" }}
//         />
//       ) : (
//         <View style={styles.center}>
//           <Text>No books found in this category.</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   listContainer: {
//     padding: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
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
//     backgroundColor: "#e0e0e0", // Warna placeholder saat gambar sedang dimuat
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 14,
//     textAlign: "left",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "gray",
//     textAlign: "left",
//     marginTop: 4,
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   SafeAreaView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { BASE_URL } from "../api/responseUrl";

// const BookCard = ({ item }) => {
//   const imageUrl = `${BASE_URL}/storage/${item.image_url}`;

//   return (
//     <TouchableOpacity className="flex-1 bg-white rounded-xl p-3 mb-4 max-w-[48%] shadow-md">
//       <Image
//         source={{ uri: imageUrl }}
//         className="w-full h-[150px] rounded-md mb-3 bg-gray-300"
//         resizeMode="contain"
//         onError={(e) =>
//           console.log("Failed to load image:", imageUrl, e.nativeEvent.error)
//         }
//       />
//       <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
//         {item.title}
//       </Text>
//       <Text className="mt-1 text-base text-gray-600">{item.author}</Text>
//       <Text className="mt-1 text-sm text-gray-500">
//         Durasi Peminjaman : {item.loan_duration}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default function CategoryDetailScreen({ route }) {
//   const { categoryId } = route.params;

//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   async function fetchCategoryDetails() {
//     try {
//       const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`);
//       const data = await response.json();

//       if (data.success) {
//         setBooks(data.data.books);
//       } else {
//         setError(data.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Fetch detail error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchCategoryDetails();
//     const interval = setInterval(fetchCategoryDetails, 10000);
//     return () => clearInterval(interval);
//   }, [categoryId]);

//   if (isLoading) {
//     return (
//       <View className="items-center justify-center flex-1">
//         <ActivityIndicator size="large" color="#f4511e" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="items-center justify-center flex-1">
//         <Text className="text-red-600">{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       {books.length > 0 ? (
//         <FlatList
//           data={books}
//           renderItem={({ item }) => <BookCard item={item} />}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={{ padding: 16 }}
//           columnWrapperStyle={{ justifyContent: "space-between" }}
//         />
//       ) : (
//         <View className="items-center justify-center flex-1">
//           <Text className="text-gray-600">
//             No books found in this category.
//           </Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   SafeAreaView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { BASE_URL } from "../api/responseUrl";

// const BookCard = ({ item, onPress }) => {
//   const imageUrl = `${BASE_URL}/storage/${item.image_url}`;

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="flex-1 bg-white rounded-xl p-3 mb-4 max-w-[48%] shadow-md"
//     >
//       <Image
//         source={{ uri: imageUrl }}
//         className="w-full h-[150px] rounded-md mb-3 bg-gray-300"
//         resizeMode="contain"
//         onError={(e) =>
//           console.log("Failed to load image:", imageUrl, e.nativeEvent.error)
//         }
//       />
//       <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
//         {item.title}
//       </Text>
//       <Text className="mt-1 text-base text-gray-600">{item.author}</Text>
//       <Text className="mt-1 text-sm text-gray-500">
//         Durasi Peminjaman : {item.loan_duration}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default function CategoryDetailScreen({ route, navigation }) {
//   const { categoryId } = route.params;

//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   async function fetchCategoryDetails() {
//     try {
//       const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`);
//       const data = await response.json();

//       if (data.success) {
//         setBooks(data.data.books);
//       } else {
//         setError(data.message || "Failed to fetch data");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Fetch detail error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchCategoryDetails();
//     const interval = setInterval(fetchCategoryDetails, 10000);
//     return () => clearInterval(interval);
//   }, [categoryId]);

//   if (isLoading) {
//     return (
//       <View className="items-center justify-center flex-1">
//         <ActivityIndicator size="large" color="#f4511e" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="items-center justify-center flex-1">
//         <Text className="text-red-600">{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       {books.length > 0 ? (
//         <FlatList
//           data={books}
//           renderItem={({ item }) => (
//             <BookCard
//               item={item}
//               onPress={() => navigation.navigate("BookDetail", { book: item })}
//             />
//           )}
//           keyExtractor={(item) => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={{ padding: 16 }}
//           columnWrapperStyle={{ justifyContent: "space-between" }}
//         />
//       ) : (
//         <View className="items-center justify-center flex-1">
//           <Text className="text-gray-600">
//             No books found in this category.
//           </Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { BASE_URL } from "../../api/responseUrl";

const BookCard = ({ item, onPress }) => {
  const imageUrl = `${BASE_URL}/storage/${item.image_url}`;
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 bg-white rounded-xl p-3 mb-4 max-w-[48%] shadow-md"
    >
      <Image
        source={
          !imageUrl || imageError
            ? require("../../assets/avatar.png") // gambar default lokal
            : { uri: imageUrl }
        }
        className="w-full h-[150px] rounded-md mb-3 bg-gray-300"
        resizeMode="contain"
        // onError={(e) =>
        //   console.log("Failed to load image:", imageUrl, e.nativeEvent.error)
        // }
        onError={() => setImageError(true)}
      />
      <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
        {item.title}
      </Text>
      <Text className="mt-1 text-base text-gray-600">{item.author}</Text>
      <Text className="mt-1 text-sm text-gray-500">
        Durasi Peminjaman : {item.loan_duration}
      </Text>
    </TouchableOpacity>
  );
};

export default function CategoryDetailScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCategoryDetails() {
    try {
      const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`);
      const data = await response.json();

      if (data.success) {
        setBooks(data.data.books);
      } else {
        setError(data.message || "Failed to fetch data");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Fetch detail error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryDetails();
    const interval = setInterval(fetchCategoryDetails, 10000);
    return () => clearInterval(interval);
  }, [categoryId]);

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-red-600">{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <BookCard
              item={item}
              onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
              // onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <View className="items-center justify-center flex-1">
          <Text className="text-gray-600">
            No books found in this category.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
