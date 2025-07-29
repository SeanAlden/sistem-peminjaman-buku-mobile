import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BASE_URL } from "../api/responseUrl";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function CategorySearchScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCategories = () => {
    fetch(`${BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
          setFiltered(data.data);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  useEffect(() => {
    // Ambil data pertama kali
    fetchCategories();

    // Mulai polling setiap 5 detik
    const interval = setInterval(() => {
      fetchCategories();
    }, 5000); // 5000 ms = 5 detik

    // Bersihkan interval saat komponen dibongkar
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFiltered(
      categories.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, categories]);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <TextInput
        placeholder="Cari kategori..."
        value={search}
        onChangeText={setSearch}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CategoryDetail", {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
            className="flex-row justify-between items-center py-3 border-b border-gray-200"
          >
            <Text className="text-base text-gray-800">{item.name}</Text>
            <ChevronRightIcon size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
