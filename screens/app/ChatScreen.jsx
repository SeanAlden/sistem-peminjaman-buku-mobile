// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// import Pusher from 'pusher-js/react-native';
// import { BASE_URL } from '../../api/responseUrl';

// const ChatScreen = ({ route }) => {
//   const { userId, adminName } = route.params;
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     // Setup Pusher
//     const pusher = new Pusher("124bce746e660c70dfb6", {
//       cluster: "ap1"
//     });

//     const channel = pusher.subscribe("chat." + userId);
//     channel.bind("message.sent", (data) => {
//       setMessages(prev => [...prev, { from: data.message.from, body: data.message.body }]);
//     });

//     return () => {
//       pusher.unsubscribe("chat." + userId);
//     };
//   }, []);

//   const sendMessage = async () => {
//     await fetch(`${BASE_URL}/${userId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input })
//     });
//     setInput('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Chat with {adminName}</Text>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <Text style={styles.message}><Text style={styles.sender}>{item.from}: </Text>{item.body}</Text>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.messageList}
//       />
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
//   container: { flex: 1, padding: 10 },
//   header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   messageList: { flex: 1, marginBottom: 10 },
//   message: { padding: 5 },
//   sender: { fontWeight: 'bold' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center' },
//   input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 5, borderRadius: 5 }
// });

// export default ChatScreen;

// screens/app/ChatScreen.jsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Pusher from 'pusher-js/react-native';
import { BASE_URL } from '../../api/responseUrl';
import { AuthContext } from '../../context/AuthContext';

const PUSHER_KEY = '124bce746e660c70dfb6'; // replace with your key (or put in env)
const PUSHER_CLUSTER = 'ap1';

export default function ChatScreen({ route, navigation }) {
  const { user: authUser } = useContext(AuthContext);

  // route may be undefined or missing params, so fallback
  const routeParams = route?.params ?? {};
  const otherUserId = routeParams.userId ?? null;   // the user we chat *with*
  const adminName = routeParams.adminName ?? 'Admin';

  const currentUserId = authUser?.id ?? null; // current logged in user id (receiver/sender depending)

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pusherClient, setPusherClient] = useState(null);

  useEffect(() => {
    // If we don't have otherUserId and also don't have current user, we can't proceed
    // Allow screen to show but show message
    if (!otherUserId) {
      // If we have a current user, optionally we could search open conversation; for now do nothing
      return;
    }

    // Load chat history (messages between authUser and otherUser)
    const loadHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/messages/${otherUserId}`, {
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          // data expected array of messages with fields sender_id, receiver_id, message, created_at
          const mapped = data.map(m => ({
            id: m.id,
            from_id: m.sender_id,
            to_id: m.receiver_id,
            body: m.message,
            created_at: m.created_at,
            from_name: m.sender?.name ?? (m.sender_id === currentUserId ? authUser?.name : adminName)
          }));
          setMessages(mapped);
        } else {
          console.warn('Failed to load messages', res.status);
        }
      } catch (err) {
        console.error('Error loading history', err);
      }
    };

    loadHistory();

    // Setup Pusher
    try {
      const pusher = new Pusher(PUSHER_KEY, {
        cluster: PUSHER_CLUSTER,
        forceTLS: true,
      });
      setPusherClient(pusher);

      // Subscribe to channel for current user (so this client receives messages sent to them)
      // If currentUserId is null (not logged in), we cannot subscribe properly.
      const channelName = `chat.${currentUserId ?? otherUserId}`; // fallback to otherUserId if current unknown
      const channel = pusher.subscribe(channelName);

      channel.bind('message.sent', (e) => {
        // e.message is expected payload: { id, from_id, from, to_id, body, created_at }
        const payload = e.message ?? e;
        setMessages(prev => [...prev, {
          id: payload.id ?? Date.now().toString(),
          from_id: payload.from_id,
          to_id: payload.to_id,
          body: payload.body,
          created_at: payload.created_at,
          from_name: payload.from ?? (payload.from_id === currentUserId ? authUser?.name : adminName)
        }]);
      });

      return () => {
        try {
          channel.unbind_all && channel.unbind_all();
          pusher.unsubscribe(channelName);
          pusher.disconnect();
        } catch (e) {
          // ignore cleanup errors
        }
      };
    } catch (err) {
      console.error('Pusher init error', err);
    }

  }, [otherUserId, currentUserId]);

  // send message to server
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!otherUserId) {
      alert('No recipient specified for this chat.');
      return;
    }

    const payload = { message: input.trim() };

    try {
      const res = await fetch(`${BASE_URL}/chat/send/${otherUserId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error('Send failed', res.status);
        return;
      }

      const json = await res.json();
      // server returns saved message payload in json.message as in earlier server fix
      const m = json.message ?? {
        id: Date.now().toString(),
        from_id: currentUserId,
        to_id: otherUserId,
        body: input,
        created_at: new Date().toISOString(),
        from: authUser?.name ?? 'You'
      };

      // append local copy immediately so sender sees it
      setMessages(prev => [...prev, {
        id: m.id,
        from_id: m.from_id ?? currentUserId,
        to_id: m.to_id ?? otherUserId,
        body: m.body,
        created_at: m.created_at,
        from_name: m.from ?? authUser?.name
      }]);

      setInput('');
    } catch (err) {
      console.error('Error sending', err);
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.from_id === currentUserId;
    return (
      <View style={[styles.msgRow, isMe ? styles.msgRowRight : styles.msgRowLeft]}>
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={isMe ? styles.bubbleTextMe : styles.bubbleTextOther}>
            {item.from_name ? item.from_name + ': ' : ''}{item.body}
          </Text>
          <Text style={styles.time}>{item.created_at ? item.created_at.split('T').join(' ').split('.')[0] : ''}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Chat with {adminName}</Text>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 12, fontSize: 18, fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'center' },
  msgRow: { marginVertical: 6, flexDirection: 'row' },
  msgRowLeft: { justifyContent: 'flex-start', marginLeft: 6 },
  msgRowRight: { justifyContent: 'flex-end', marginRight: 6 },
  bubble: { maxWidth: '80%', padding: 10, borderRadius: 10 },
  bubbleMe: { backgroundColor: '#34D399', alignSelf: 'flex-end' },
  bubbleOther: { backgroundColor: '#E5E7EB', alignSelf: 'flex-start' },
  bubbleTextMe: { color: '#fff' },
  bubbleTextOther: { color: '#111827' },
  time: { fontSize: 10, color: '#6B7280', marginTop: 6 },
  inputContainer: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#e5e7eb' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginRight: 8 },
  sendBtn: { backgroundColor: '#f97316', paddingHorizontal: 14, justifyContent: 'center', borderRadius: 6 }
});
