// import React, { useEffect, useState, useContext } from "react";
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from "react-native";
// import Pusher from "pusher-js/react-native";
// import { AuthContext } from "../../context/AuthContext";
// import { BASE_URL } from "../../api/responseUrl";

// // const ChatDetailScreen = ({ route }) => {
// //   const { otherUserId, otherUserName, otherUserAvatar } = route.params;
// //   const { user } = useContext(AuthContext); // user login
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");

// //   useEffect(() => {
// //     // Setup Pusher
// //     const pusher = new Pusher("124bce746e660c70dfb6", { cluster: "ap1" });
// //     const channel = pusher.subscribe(`chat.${user.id}.${otherUserId}`);

// //     channel.bind("message.sent", (data) => {
// //       setMessages((prev) => [...prev, data.message]);
// //     });

// //     // load history
// //     fetch(`${BASE_URL}/chat/history/${user.id}/${otherUserId}`)
// //       .then((res) => res.json())
// //       .then((data) => setMessages(data.data || []))
// //       .catch((err) => console.error(err));

// //     return () => {
// //       pusher.unsubscribe(`chat.${user.id}.${otherUserId}`);
// //     };
// //   }, [user.id, otherUserId]);

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;
// //     await fetch(`${BASE_URL}/chat/send`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         from: user.id,
// //         to: otherUserId,
// //         body: input,
// //       }),
// //     });
// //     setInput("");
// //   };

// const ChatDetailScreen = ({ route }) => {
//   const { otherUserId, otherUserName, otherUserAvatar } = route.params ?? {};
//   const { user } = useContext(AuthContext); // user login
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     if (!user?.id || !otherUserId) return; // 🚀 cegah error user undefined

//     // Setup Pusher
//     const pusher = new Pusher("124bce746e660c70dfb6", { cluster: "ap1" });
//     const channelName = `chat.${user.id}.${otherUserId}`;
//     const channel = pusher.subscribe(channelName);

//     channel.bind("message.sent", (data) => {
//       setMessages((prev) => [...prev, data.message]);
//     });

//     // load history
//     fetch(`${BASE_URL}/chat/history/${user.id}/${otherUserId}`)
//       .then((res) => res.json())
//       .then((data) => setMessages(data.data || []))
//       .catch((err) => console.error(err));

//     return () => {
//       pusher.unsubscribe(channelName);
//     };
//   }, [user?.id, otherUserId]);

//   const sendMessage = async () => {
//     if (!input.trim() || !user?.id || !otherUserId) return;

//     await fetch(`${BASE_URL}/chat/send`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         from: user.id,
//         to: otherUserId,
//         body: input,
//       }),
//     });
//     setInput("");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image
//           source={ otherUserAvatar ? { uri: otherUserAvatar } : require("../../assets/profile.png") }
//           style={styles.avatar}
//         />
//         <Text style={styles.title}>{otherUserName}</Text>
//       </View>

//       {/* Messages */}
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <Text style={styles.message}>
//             <Text style={styles.sender}>{item.from === user.id ? "You" : otherUserName}: </Text>
//             {item.body}
//           </Text>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.messageList}
//       />

//       {/* Input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={input}
//           onChangeText={setInput}
//           placeholder="Type message..."
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1 },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   title: { fontSize: 18, fontWeight: "bold" },
//   messageList: { flex: 1, padding: 10 },
//   message: { marginVertical: 4 },
//   sender: { fontWeight: "bold" },
//   inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1 },
//   input: { flex: 1, borderWidth: 1, borderRadius: 5, padding: 8, marginRight: 5 },
// });

// export default ChatDetailScreen;

// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   ActivityIndicator
// } from "react-native";
// import Pusher from "pusher-js/react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "../../api/responseUrl";
// import { AuthContext } from "../../context/AuthContext";

// const PUSHER_KEY = "124bce746e660c70dfb6"; // ganti sesuai app Anda
// const PUSHER_CLUSTER = "ap1";

// export default function ChatDetailScreen({ route, navigation }) {
//   const { otherUserId, otherUserName, otherUserAvatar } = route.params ?? {};
//   const { user: authUser } = useContext(AuthContext); // preferkan AuthContext
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [pusherClient, setPusherClient] = useState(null);

//   // ambil token helper
//   const getToken = async () => {
//     const t = await AsyncStorage.getItem("auth_token");
//     return t;
//   };

//   useEffect(() => {
//     let mounted = true;
//     if (!otherUserId) {
//       console.warn("No otherUserId passed to ChatDetailScreen");
//       setLoading(false);
//       return;
//     }

//     const init = async () => {
//       const token = await getToken();
//       if (!token) {
//         console.warn("No auth token found");
//         setLoading(false);
//         return;
//       }

//       // load history
//       try {
//         const res = await fetch(`${BASE_URL}/api/chat/messages/${otherUserId}`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`
//           }
//         });
//         if (res.ok) {
//           const json = await res.json();
//           if (json.success && Array.isArray(json.data)) {
//             if (mounted) setMessages(json.data);
//           } else {
//             console.warn("API returned:", json);
//           }
//         } else {
//           console.warn("Failed to load messages", res.status);
//         }
//       } catch (err) {
//         console.error("Error loading messages", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }

//       // Setup Pusher (subscribe to channel owned by CURRENT AUTH USER)
//       try {
//         const pusher = new Pusher(PUSHER_KEY, {
//           cluster: PUSHER_CLUSTER,
//           forceTLS: true,
//         });
//         setPusherClient(pusher);

//         const currentUserId = authUser?.id ?? null;
//         if (!currentUserId) {
//           // If authUser is not ready, don't subscribe
//           console.warn("authUser not ready for pusher subscription");
//           return;
//         }

//         const channelName = `chat.${currentUserId}`;
//         const channel = pusher.subscribe(channelName);

//         channel.bind("message.sent", (e) => {
//           const payload = e.message ?? e;
//           // jika pesan ditujukan ke current user, tambahkan
//           if (payload.to_id == currentUserId || payload.from_id == currentUserId) {
//             setMessages(prev => [...prev, payload]);
//           }
//         });
//       } catch (err) {
//         console.error("Pusher init error", err);
//       }
//     };

//     init();

//     return () => {
//       mounted = false;
//       try {
//         if (pusherClient) {
//           const cid = `chat.${authUser?.id}`;
//           pusherClient.unsubscribe(cid);
//           pusherClient.disconnect();
//         }
//       } catch (e) {}
//     };
//   }, [otherUserId, authUser?.id]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const token = await getToken();
//     if (!token) {
//       alert("Not authenticated");
//       return;
//     }

//     const body = { message: input.trim() };

//     try {
//       const res = await fetch(`${BASE_URL}/api/chat/send/${otherUserId}`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(body)
//       });

//       if (!res.ok) {
//         console.error("Send failed", res.status);
//         return;
//       }

//       const json = await res.json();
//       if (json.success && json.message) {
//         // append saved message (server returns payload)
//         setMessages(prev => [...prev, json.message]);
//       } else {
//         // fallback local append
//         setMessages(prev => [...prev, {
//           id: Date.now().toString(),
//           from_id: authUser?.id,
//           to_id: otherUserId,
//           body: input,
//           created_at: new Date().toISOString(),
//           from: authUser?.name ?? "You",
//         }]);
//       }

//       setInput("");
//     } catch (err) {
//       console.error("Error sending message", err);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isMe = String(item.from_id) === String(authUser?.id);
//     return (
//       <View style={[styles.msgRow, isMe ? styles.msgRowRight : styles.msgRowLeft]}>
//         <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
//           <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextOther}>
//             { (item.from ?? (item.sender?.name)) ? ( (isMe ? "You": item.from ?? item.sender?.name) + ': ' ) : '' }
//             {item.body}
//           </Text>
//           <Text style={styles.time}>{item.created_at ? item.created_at.replace('T', ' ').split('.')[0] : ''}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Image source={ otherUserAvatar ? { uri: otherUserAvatar } : require("../../assets/profile.png") } style={styles.avatar} />
//           <Text style={styles.title}>{otherUserName}</Text>
//         </View>

//         {loading ? <ActivityIndicator style={{flex:1}}/> :
//           <FlatList
//             data={messages}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
//             contentContainerStyle={{ padding: 10, flexGrow: 1 }}
//             inverted={false}
//           />
//         }

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={input}
//             onChangeText={setInput}
//             placeholder="Type a message..."
//           />
//           <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
//             <Text style={{ color: '#fff', fontWeight: '600' }}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   title: { fontSize: 18, fontWeight: 'bold' },
//   msgRow: { marginVertical: 6, flexDirection: 'row' },
//   msgRowLeft: { justifyContent: 'flex-start', marginLeft: 6 },
//   msgRowRight: { justifyContent: 'flex-end', marginRight: 6 },
//   bubble: { maxWidth: '80%', padding: 10, borderRadius: 10 },
//   bubbleMe: { backgroundColor: '#34D399', alignSelf: 'flex-end' },
//   bubbleOther: { backgroundColor: '#E5E7EB', alignSelf: 'flex-start' },
//   bubbleTextMe: { color: '#fff' },
//   bubbleTextOther: { color: '#111827' },
//   time: { fontSize: 10, color: '#6B7280', marginTop: 6 },
//   inputContainer: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#e5e7eb' },
//   input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginRight: 8 },
//   sendBtn: { backgroundColor: '#f97316', paddingHorizontal: 14, justifyContent: 'center', borderRadius: 6 }
// });

// import React, { useEffect, useState, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   ActivityIndicator
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from "../../api/responseUrl";
// import { AuthContext } from "../../context/AuthContext";

// export default function ChatDetailScreen({ route }) {
//   const { otherUserId, otherUserName, otherUserAvatar } = route.params ?? {};
//   const { user: authUser } = useContext(AuthContext);

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(true);

//   const getToken = async () => await AsyncStorage.getItem("auth_token");

//   const loadMessages = async () => {
//     const token = await getToken();
//     if (!token) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/chat/messages/${otherUserId}`, {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         const json = await res.json();
//         if (json.success && Array.isArray(json.data)) {
//           setMessages(json.data);
//         }
//       }
//     } catch (err) {
//       console.error("Error fetching messages", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!otherUserId) return;
//     loadMessages();
//     const interval = setInterval(loadMessages, 3000);
//     return () => clearInterval(interval);
//   }, [otherUserId]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const token = await getToken();
//     if (!token) {
//       alert("Not authenticated");
//       return;
//     }

//     try {
//       const res = await fetch(`${BASE_URL}/api/chat/send/${otherUserId}`, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message: input.trim() }),
//       });

//       if (res.ok) {
//         const json = await res.json();
//         if (json.success && json.message) {
//           setMessages((prev) => [...prev, json.message]);
//         }
//       }

//       setInput("");
//     } catch (err) {
//       console.error("Error sending message", err);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isMe = String(item.from_id) === String(authUser?.id);
//     return (
//       <View style={[styles.msgRow, isMe ? styles.msgRowLeft : styles.msgRowRight]}>
//         <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
//           <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextOther}>
//             {(item.from ?? item.sender?.name)
//               ? (isMe ? "You" : item.from ?? item.sender?.name) + ": "
//               : ""}
//             {item.body}
//           </Text>
//           <Text style={styles.time}>
//             {item.created_at
//               ? item.created_at.replace("T", " ").split(".")[0]
//               : ""}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//       keyboardVerticalOffset={140} // offset biar pas
//     >
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Image
//             source={
//               otherUserAvatar
//                 ? { uri: otherUserAvatar }
//                 : require("../../assets/profile.png")
//             }
//             style={styles.avatar}
//           />
//           <Text style={styles.title}>{otherUserName}</Text>
//         </View>

//         {loading ? (
//           <ActivityIndicator style={{ flex: 1 }} />
//         ) : (
//           <FlatList
//             data={messages}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
//             contentContainerStyle={{ padding: 10, flexGrow: 1 }}
//           />
//         )}

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={input}
//             onChangeText={setInput}
//             placeholder="Type a message..."
//           />
//           <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
//             <Text style={{ color: "#fff", fontWeight: "600" }}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   title: { fontSize: 18, fontWeight: "bold" },
//   msgRow: { marginVertical: 6, flexDirection: "row" },
//   msgRowLeft: { justifyContent: "flex-start", marginLeft: 6 },
//   msgRowRight: { justifyContent: "flex-end", marginRight: 6 },
//   bubble: { maxWidth: "80%", padding: 10, borderRadius: 10 },
//   bubbleMe: { backgroundColor: "#34D399", alignSelf: "flex-start" }, // 👈 hijau ke kiri
//   bubbleOther: { backgroundColor: "#E5E7EB", alignSelf: "flex-end" }, // 👈 abu ke kanan
//   bubbleTextMe: { color: "#fff" },
//   bubbleTextOther: { color: "#111827" },
//   time: { fontSize: 10, color: "#6B7280", marginTop: 6 },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 8,
//     borderTopWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 8,
//     borderRadius: 6,
//     marginRight: 8,
//   },
//   sendBtn: {
//     backgroundColor: "#f97316",
//     paddingHorizontal: 14,
//     justifyContent: "center",
//     borderRadius: 6,
//   },
// });

import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../api/responseUrl";
import { AuthContext } from "../../context/AuthContext";

export default function ChatDetailScreen({ route }) {
  const { otherUserId, otherUserName, otherUserAvatar } = route.params ?? {};
  const { user: authUser } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null); // 👉 untuk akses FlatList

  const getToken = async () => await AsyncStorage.getItem("auth_token");

  const loadMessages = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/api/chat/messages/${otherUserId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setMessages(json.data);
        }
      }
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!otherUserId) return;
    loadMessages();
    const interval = setInterval(loadMessages, 1000);
    return () => clearInterval(interval);
  }, [otherUserId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const token = await getToken();
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/chat/send/${otherUserId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.message) {
          setMessages((prev) => [...prev, json.message]);
        }
      }

      setInput("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = String(item.from_id) === String(authUser?.id);
    return (
      <View style={[styles.msgRow, isMe ? styles.msgRowLeft : styles.msgRowRight]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextOther}>
            {(item.from ?? item.sender?.name)
              ? (isMe ? "You" : item.from ?? item.sender?.name) + ": "
              : ""}
            {item.body}
          </Text>
          <Text style={styles.time}>
            {item.created_at
              ? item.created_at.replace("T", " ").split(".")[0]
              : ""}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={140}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={
              otherUserAvatar
                ? { uri: `${BASE_URL}/storage/profile_images/${otherUserAvatar}` }
                : require("../../assets/profile.png")
            }
            style={styles.avatar}
          />
          <Text style={styles.title}>{otherUserName}</Text>
        </View>

        {loading ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
            contentContainerStyle={{ padding: 10, flexGrow: 1 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  msgRow: { marginVertical: 6, flexDirection: "row" },
  msgRowLeft: { justifyContent: "flex-start", marginLeft: 6 },
  msgRowRight: { justifyContent: "flex-end", marginRight: 6 },
  bubble: { maxWidth: "80%", padding: 10, borderRadius: 10 },
  bubbleMe: { backgroundColor: "#34D399", alignSelf: "flex-start" }, // hijau ke kiri
  bubbleOther: { backgroundColor: "#E5E7EB", alignSelf: "flex-end" }, // abu ke kanan
  bubbleTextMe: { color: "#fff" },
  bubbleTextOther: { color: "#111827" },
  time: { fontSize: 10, color: "#6B7280", marginTop: 6 },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 6,
  },
});
