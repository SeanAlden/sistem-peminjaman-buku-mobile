import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { BASE_URL } from "../../api/responseUrl";

const ChatListScreen = ({ navigation }) => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/non-users`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setAdmins(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("ChatDetailScreen", {
          otherUserId: item.id,
          otherUserName: item.name,
          otherUserAvatar: item.avatar || null,
        })
      }
    >
      <Image
        source={ item.avatar ? { uri: item.avatar } : require("../../assets/default-avatar.png") }
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={admins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "500" },
});

export default ChatListScreen;
