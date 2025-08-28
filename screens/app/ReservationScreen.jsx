import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native'; // Untuk refresh

export default function ReservationScreen() {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const fetchReservations = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            const res = await axios.get(`${BASE_URL}/api/my-reservations`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(res.data.data);
        } catch (err) {
            console.error("Gagal ambil data reservasi:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Refresh data setiap kali screen ini dibuka/fokus
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);
            fetchReservations();
        });
        return unsubscribe;
    }, [navigation]);

    const handleCancel = async (id) => {
        Alert.alert("Konfirmasi", "Yakin ingin membatalkan reservasi ini?", [
            { text: "Tidak", style: "cancel" },
            {
                text: "Ya",
                onPress: async () => {
                    try {
                        const token = await AsyncStorage.getItem("auth_token");
                        await axios.delete(`${BASE_URL}/api/reservations/${id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        Alert.alert("Berhasil", "Reservasi dibatalkan");
                        fetchReservations();
                    } catch (err) {
                        Alert.alert("Error", "Gagal membatalkan reservasi");
                    }
                },
            },
        ]);
    };
    
    const renderItem = ({ item }) => (
        <View className="p-4 mb-3 bg-gray-100 rounded-lg">
            <View className="flex-row space-x-3">
                <Image
                    source={item.book.image_url ? { uri: item.book.image_url } : require("../../assets/avatar.png")}
                    className="w-[90px] h-[90px] rounded-md mr-3"
                    resizeMode="contain"
                />
                <View className="flex-1">
                    <Text className="text-lg font-bold">{item.book.title}</Text>
                    <Text className="text-gray-700">Status: 
                        <Text className={`font-bold ${item.status === 'available' ? 'text-green-600' : 'text-gray-700'}`}>
                            {` ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`}
                        </Text>
                    </Text>
                    {item.status === 'pending' && (
                        <Text className="text-gray-700">Posisi Antrian: {item.queue_position}</Text>
                    )}
                    {item.status === 'available' && (
                        <Text className="font-semibold text-blue-600">
                            Segera ambil sebelum {new Date(item.expires_at).toLocaleDateString()}
                        </Text>
                    )}

                    {(item.status === "pending" || item.status === "available") && (
                        <View className="flex-row mt-3">
                            <TouchableOpacity onPress={() => handleCancel(item.id)} className="px-4 py-2 bg-red-600 rounded">
                                <Text className="font-medium text-white">Batalkan</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    if (isLoading) {
        return <View className="items-center justify-center flex-1"><ActivityIndicator size="large" /></View>;
    }

    return (
        <View className="flex-1 px-4 pt-4 bg-white">
            <Text className="mb-4 text-2xl font-bold text-gray-800">🎟️ Daftar Reservasi Saya</Text>
            <FlatList
                data={reservations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text className="mt-5 text-center text-gray-500">Anda tidak memiliki reservasi.</Text>}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}