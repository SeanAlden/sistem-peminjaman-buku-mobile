// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
// import axios from "axios";
// import { BASE_URL } from "../api/responseUrl";

// export default function LoanScreen() {
//   const [loans, setLoans] = useState([]);

//   const fetchLoans = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/loans`);
//       setLoans(res.data.data);
//     } catch (err) {
//       console.error("Gagal ambil data:", err);
//     }
//   };

//   const handleReturn = async (id) => {
//     try {
//       await axios.post(`${BASE_URL}/loans/${id}/return`);
//       Alert.alert("Berhasil", "Buku berhasil dikembalikan");
//       fetchLoans();
//     } catch (err) {
//       Alert.alert("Error", "Gagal mengembalikan buku");
//     }
//   };

//   const handleCancel = async (id) => {
//     Alert.alert(
//       "Konfirmasi",
//       "Yakin ingin membatalkan peminjaman?",
//       [
//         { text: "Batal", style: "cancel" },
//         {
//           text: "Ya",
//           onPress: async () => {
//             try {
//               await axios.delete(`${BASE_URL}/loans/${id}`);
//               Alert.alert("Dibatalkan", "Peminjaman dibatalkan");
//               fetchLoans();
//             } catch (err) {
//               Alert.alert("Error", "Gagal membatalkan peminjaman");
//             }
//           },
//         },
//       ]
//     );
//   };

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>{item.book.title}</Text>
//       <Text>Durasi: {item.loan_date} - {item.return_date || "Belum dikembalikan"}</Text>
//       <Text>Status: {item.status}</Text>

//       {item.status === "borrowed" && (
//         <View style={styles.buttonRow}>
//           <Button title="Kembalikan" onPress={() => handleReturn(item.id)} />
//           <View style={{ width: 10 }} />
//           <Button title="Batalkan" color="red" onPress={() => handleCancel(item.id)} />
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📖 Daftar Peminjaman</Text>
//       <FlatList
//         data={loans}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   card: {
//     padding: 16,
//     backgroundColor: "#f3f3f3",
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 12,
//   },
// });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Button,
//   Alert,
//   Image,
// } from "react-native";
// import axios from "axios";
// import { BASE_URL } from "../api/responseUrl";

// export default function LoanScreen() {
//   const [loans, setLoans] = useState([]);

//   const fetchLoans = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/loans`);
//       setLoans(res.data.data);
//     } catch (err) {
//       console.error("Gagal ambil data:", err);
//     }
//   };

//   const handleReturn = async (id) => {
//     try {
//       await axios.post(`${BASE_URL}/api/loans/${id}/return`);
//       Alert.alert("Berhasil", "Buku berhasil dikembalikan");
//       fetchLoans();
//     } catch (err) {
//       Alert.alert("Error", "Gagal mengembalikan buku");
//     }
//   };

//   const handleCancel = async (id) => {
//     Alert.alert("Konfirmasi", "Yakin ingin membatalkan peminjaman?", [
//       { text: "Batal", style: "cancel" },
//       {
//         text: "Ya",
//         onPress: async () => {
//           try {
//             await axios.delete(`${BASE_URL}/api/loans/${id}`);
//             Alert.alert("Dibatalkan", "Peminjaman dibatalkan");
//             fetchLoans();
//           } catch (err) {
//             Alert.alert("Error", "Gagal membatalkan peminjaman");
//           }
//         },
//       },
//     ]);
//   };

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.row}>
//         <Image
//           source={{ uri: `${BASE_URL}/storage/${item.book.image_url}` }}
//           style={styles.image}
//           resizeMode="contain"
//         />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{item.book.title}</Text>
//           <Text>Tanggal Peminjaman: {item.loan_date}</Text>
//           <Text>Tanggal Pengembalian: {item.return_date}</Text>
//           <Text>Terlambat: {item.late_days} Hari</Text>
//           <Text>Denda: {item.fine_amount}</Text>
//           <Text>Status: {item.status}</Text>
//           <Text>Notes: {item.return_status_note}</Text>

//           {item.status === "borrowed" && (
//             <View style={styles.buttonRow}>
//               <Button title="Kembalikan" onPress={() => handleReturn(item.id)} />
//               <View style={{ width: 10 }} />
//               <Button title="Batalkan" color="red" onPress={() => handleCancel(item.id)} />
//             </View>
//           )}
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📖 Daftar Peminjaman</Text>
//       <FlatList
//         data={loans}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//     flex: 1,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   card: {
//     padding: 12,
//     backgroundColor: "#f3f3f3",
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   row: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   image: {
//     width: 90,
//     height: 90,
//     borderRadius: 6,
//     marginRight: 12,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 12,
//   },
// });

// Kalau dengan NativeWind
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../api/responseUrl";

export default function LoanScreen() {
  const [loans, setLoans] = useState([]);
  const [imageError, setImageError] = useState(false);

  const fetchLoans = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/loans`);
      setLoans(res.data.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleReturn = async (id) => {
    try {
      await axios.post(`${BASE_URL}/api/loans/${id}/return`);
      Alert.alert("Berhasil", "Buku berhasil dikembalikan");
      fetchLoans();
    } catch (err) {
      Alert.alert("Error", "Gagal mengembalikan buku");
    }
  };

  const handleCancel = async (id) => {
    Alert.alert("Konfirmasi", "Yakin ingin membatalkan peminjaman?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Ya",
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/api/loans/${id}`);
            Alert.alert("Dibatalkan", "Peminjaman dibatalkan");
            fetchLoans();
          } catch (err) {
            Alert.alert("Error", "Gagal membatalkan peminjaman");
          }
        },
      },
    ]);
  };

  // useEffect(() => {
  //   fetchLoans();
  // }, []);

  useEffect(() => {
    fetchLoans(); // initial fetch

    const interval = setInterval(() => {
      fetchLoans(); // fetch setiap 10 detik
    }, 10000); // 10000ms = 10 detik

    return () => clearInterval(interval); // bersihkan interval saat unmount
  }, []);

  const renderItem = ({ item }) => (
    <View className="p-4 mb-3 bg-gray-100 rounded-lg">
      <View className="flex-row space-x-3">
        <Image
          // source={{ uri: `${BASE_URL}/storage/${item.book.image_url}` }}
          source={
            (!item.book.image_url && item.book.image_url.trim() !== "") ||
            imageError
              ? require("../assets/avatar.png") // gambar default lokal
              : { uri: `${BASE_URL}/storage/${item.book.image_url}` }
          }
          className="w-[90px] h-[90px] rounded-md mr-3"
          resizeMode="contain"
          onError={() => setImageError(true)}
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">{item.book.title}</Text>
          {/* <Text className="text-gray-700">
            Tanggal Peminjaman: {item.loan_date}
          </Text>
          <Text className="text-gray-700">
            Tanggal Pengembalian: {item.return_date}
          </Text> */}
          <Text className="text-gray-700">
            Tanggal Peminjaman: {new Date(item.loan_date).toLocaleString()}
          </Text>
          <Text className="text-gray-700">
            Tanggal Pengembalian (Maks.):{" "}
            {new Date(item.return_date).toLocaleString()}
          </Text>
          {item.actual_returned_at && (
            <Text className="text-gray-700">
              Dikembalikan Pada:{" "}
              {new Date(item.actual_returned_at).toLocaleString()}
            </Text>
          )}

          <Text className="text-gray-700">
            Terlambat: {item.late_days} Hari
          </Text>
          <Text className="text-gray-700">Denda: {item.fine_amount}</Text>
          <Text className="text-gray-700">Status: {item.status}</Text>
          <Text className="text-gray-700">
            Notes: {item.return_status_note}
          </Text>

          {item.status === "borrowed" && (
            // <View className="flex-row mt-3 space-x-3">
            //   <TouchableOpacity
            //     onPress={() => handleReturn(item.id)}
            //     className="px-4 py-2 bg-green-600 rounded"
            //   >
            //     <Text className="font-medium text-white">Kembalikan</Text>
            //   </TouchableOpacity>
            //   <TouchableOpacity
            //     onPress={() => handleCancel(item.id)}
            //     className="px-4 py-2 bg-red-600 rounded"
            //   >
            //     <Text className="font-medium text-white">Batalkan</Text>
            //   </TouchableOpacity>
            // </View>
            <View className="flex-row mt-3">
              <TouchableOpacity
                onPress={() => handleReturn(item.id)}
                className="px-4 py-2 mr-3 bg-green-600 rounded"
              >
                <Text className="font-medium text-white">Kembalikan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCancel(item.id)}
                className="px-4 py-2 bg-red-600 rounded"
              >
                <Text className="font-medium text-white">Batalkan</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 px-4 pt-4 bg-white">
      <Text className="mb-4 text-2xl font-bold text-gray-800">
        📖 Daftar Peminjaman
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={loans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
