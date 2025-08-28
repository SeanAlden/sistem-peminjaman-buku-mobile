import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../api/responseUrl";
// Anda mungkin memerlukan ikon, contoh menggunakan 'Feather' dari 'react-native-vector-icons'
// import Icon from 'react-native-vector-icons/Feather';

// Komponen untuk setiap item buku dalam daftar
const BookItem = ({ book }) => (
  <View className="flex-row p-4 mx-4 mb-5 overflow-hidden bg-white shadow-lg rounded-xl">
    <Image
      source={{
        uri:
          `${BASE_URL}/storage/${book.image_url}` ||
          "https://via.placeholder.com/100x150.png?text=No+Image",
      }}
      className="w-24 rounded-lg h-36"
      resizeMode="contain"
    />
    <View className="justify-center flex-1 ml-4">
      <Text className="text-lg font-bold text-gray-800" numberOfLines={2}>
        {book.title}
      </Text>
      <Text className="mt-1 text-sm text-gray-600">oleh {book.author}</Text>
      <View className="flex-row items-center mt-3">
        {/* Contoh info tambahan jika ada, misal: stok */}
        <Text
          className={`text-xs font-semibold ${book.stock > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {book.stock > 0 ? `Tersedia: ${book.stock}` : "Tidak Tersedia"}
        </Text>
      </View>
    </View>
  </View>
);

// Komponen utama untuk layar Favorit
const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Ganti dengan URL API Anda
  //   const API_BASE_URL = 'http://192.168.1.10:8000/api';
  // Sesuaikan key jika Anda menyimpan token dengan nama yang berbeda
  const TOKEN_STORAGE_KEY = "auth_token";

  const fetchFavorites = async () => {
    try {
      setError(null);
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const response = await axios.get(`${BASE_URL}/api/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setFavorites(response.data.data);
      } else {
        throw new Error("Gagal mengambil data dari server.");
      }
    } catch (err) {
      console.error("Fetch Favorites Error:", err);
      setError(
        err.response?.data?.message || err.message || "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Panggil fetchFavorites saat komponen pertama kali dimuat
    setLoading(true);
    fetchFavorites();

    const interval = setInterval(() => {
      fetchFavorites();
    }, 10000); // 10000ms = 10 detik

    return () => clearInterval(interval); // bersihkan interval saat unmount
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavorites().finally(() => setRefreshing(false));
  }, []);

  // Tampilan saat loading
  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-lg text-gray-600">Memuat Favorit...</Text>
      </SafeAreaView>
    );
  }

  // Tampilan saat terjadi error
  if (error) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 p-5 bg-gray-50">
        {/* <Icon name="alert-triangle" size={48} color="#ef4444" /> */}
        <Text className="mt-4 text-xl font-semibold text-center text-red-600">
          Oops! Terjadi Kesalahan
        </Text>
        <Text className="mt-2 text-base text-center text-gray-700">
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  // Tampilan utama
  return (
    <SafeAreaView style={styles.container} className="bg-gray-50">
      <View className="p-5 border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800">
          Buku Favorit 📚
        </Text>
        <Text className="mt-1 text-gray-500 text-md">
          Koleksi buku yang paling kamu sukai.
        </Text>
      </View>

      {favorites.length === 0 ? (
        // Tampilan jika daftar favorit kosong
        <View className="items-center justify-center flex-1">
          {/* <Icon name="heart" size={48} color="#d1d5db" /> */}
          <Text className="mt-4 text-xl font-semibold text-gray-500">
            Belum Ada Favorit
          </Text>
          <Text className="mt-1 text-base text-gray-400">
            Tambahkan buku ke favoritmu!
          </Text>
        </View>
      ) : (
        // Tampilan jika ada buku favorit
        <FlatList
          data={favorites}
          renderItem={({ item }) => <BookItem book={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3b82f6"]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

// StyleSheet digunakan untuk properti yang tidak didukung penuh oleh NativeWind, seperti `backgroundColor` di SafeAreaView.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default FavoriteScreen;
