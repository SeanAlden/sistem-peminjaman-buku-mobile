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

  const fetchBookDetail = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");

      const response = await axios.get(
        `${BASE_URL}/api/book-details/${bookId}`,
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
