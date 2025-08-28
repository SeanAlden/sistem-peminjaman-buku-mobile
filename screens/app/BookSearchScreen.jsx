import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { BASE_URL } from "../../api/responseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookSearchScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [imageError, setImageError] = useState(false);

  // Fungsi untuk fetch data buku dari API
  const fetchBooks = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const res = await fetch(`${BASE_URL}/api/books`, {
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
      });
      const data = await res.json();
      if (data.success) {
        setBooks(data.data);
        setFiltered(
          data.data.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    } catch (error) {
      console.error("Gagal memuat buku:", error);
    }
  };

  // Gunakan interval setiap 10 detik
  useEffect(() => {
    fetchBooks(); // Fetch awal
    const interval = setInterval(fetchBooks, 10000); // Update tiap 10 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  // Filter data berdasarkan input pencarian
  useEffect(() => {
    setFiltered(
      books.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, books]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
      className="flex-row items-center p-3 mb-3 bg-white rounded-lg shadow"
    >
      <Image
        source={
          (!item.image_url && item.image_url.trim() !== "") || imageError
            ? require("../../assets/avatar.png") // gambar default lokal
            : { uri: `${item.image_url}`}
        }
        className="w-16 h-20 mr-4 rounded"
        resizeMode="contain"
        onError={() => setImageError(true)}
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600">{item.author}</Text>
        <Text className="mt-1 text-xs text-gray-500" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100">
      <TextInput
        placeholder="Cari buku..."
        value={search}
        onChangeText={setSearch}
        className="p-3 mb-4 bg-white border border-gray-300 rounded-lg"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
