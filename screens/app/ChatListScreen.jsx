// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import { BASE_URL } from "../../api/responseUrl";

// const ChatListScreen = ({ navigation }) => {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     fetch(`${BASE_URL}/non-users`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) setAdmins(data.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() =>
//         navigation.navigate("ChatDetailScreen", {
//           otherUserId: item.id,
//           otherUserName: item.name,
//           otherUserAvatar: item.profile_image || null,
//         })
//       }
//     >
//       <Image
//         source={
//           item.profile_image
//             ? { uri: `${BASE_URL}/storage/${item.profile_image}` }
//             : require("../../assets/profile.png")
//         }
//         style={styles.avatar}
//       />
//       <Text style={styles.name}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={admins}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//   },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   name: { fontSize: 16, fontWeight: "500" },
// });

// export default ChatListScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { BASE_URL } from "../../api/responseUrl";

const ChatListScreen = ({ navigation }) => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/non-users`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAdmins(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() =>
        navigation.navigate("ChatDetailScreen", {
          otherUserId: item.id,
          otherUserName: item.name,
          otherUserAvatar: item.profile_image || null,
        })
      }
    >
      <Image
        source={
          item.profile_image
            ? { uri: `${BASE_URL}/storage/profile_images/${item.profile_image}` }
            : require("../../assets/profile.png")
        }
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>Tap to start chat</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with Admin</Text>
      <FlatList
        data={admins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#2C3E50",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#4E9F3D",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#34495E",
  },
  subText: {
    fontSize: 13,
    color: "#7F8C8D",
    marginTop: 3,
  },
});

export default ChatListScreen;
