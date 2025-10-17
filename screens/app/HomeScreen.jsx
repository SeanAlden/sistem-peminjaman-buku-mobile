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

// const BookCard = ({ item, onNavigate, onToggleFavorite, isFavorited }) => {
//   const [hasImageError, setHasImageError] = useState(false);

//   const imageSource =
//     !item.image_url || hasImageError
//       ? require("../../assets/avatar.png")
//       : { uri: item.image_url };

//   return (
//     <TouchableOpacity
//       onPress={() => onNavigate(item.id)}
//       className="mr-3 w-[160px] rounded-xl bg-white p-3 shadow-md"
//     >
//       <Image
//         source={imageSource}
//         className="mb-2 h-[150px] w-full rounded-lg bg-gray-200"
//         resizeMode="contain"
//         onError={() => setHasImageError(true)}
//       />
//       <View className="absolute z-10 right-3 top-3">
//         <TouchableOpacity onPress={() => onToggleFavorite(item.id)}>
//           <AntDesign
//             name={isFavorited ? "heart" : "hearto"}
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
// };

// --- PERBAIKAN: Komponen BookCard sekarang akan menerima 'isReserved' ---
const BookCard = ({
  item,
  onNavigate,
  onToggleFavorite,
  isFavorited,
  isReserved,
}) => {
  const [hasImageError, setHasImageError] = useState(false);

  const imageSource =
    !item.image_url || hasImageError
      ? require("../../assets/avatar.png")
      : { uri: item.image_url };

  // --- PERBAIKAN: Terapkan kelas CSS kondisional di sini ---
  const cardStyle = isReserved
    ? "mr-3 w-[160px] rounded-xl bg-green-100 border border-green-300 p-3 shadow-md"
    : "mr-3 w-[160px] rounded-xl bg-white p-3 shadow-md";

  return (
    <TouchableOpacity
      onPress={() => onNavigate(item.id)}
      className={cardStyle} // Gunakan style dinamis
    >
      <Image
        source={imageSource}
        className="mb-2 h-[150px] w-full rounded-lg bg-gray-200"
        resizeMode="contain"
        onError={() => setHasImageError(true)}
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
    const focusListener = navigation.addListener("focus", () => {
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
                onPress={() => navigation.navigate("Category Search")}
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
                onPress={() => navigation.navigate("Book Search")}
              >
                <Text className="text-blue-600 text-sb">Search Book</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={books}
              keyExtractor={(item) => `book-${item.id}`}
              renderItem={({ item }) => (
                <BookCard
                  item={item}
                  onNavigate={(bookId) =>
                    navigation.navigate("Book Detail", { bookId })
                  }
                  onToggleFavorite={toggleFavorite}
                  isFavorited={favorites.includes(item.id)}
                  isReserved={item.is_reserved_by_user} 
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
