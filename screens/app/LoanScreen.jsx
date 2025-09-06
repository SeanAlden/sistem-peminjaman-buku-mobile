import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../api/responseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

// Card component to handle its own image error state
const LoanCard = ({ item, onReturn, onCancel }) => {
    const [imageError, setImageError] = useState(false);
    const imageUrl = item.book.image_url; // Assuming the full URL is provided by the API

    return (
        <View className="p-4 mb-3 bg-gray-100 rounded-lg">
            <View className="flex-row space-x-3">
                <Image
                    source={
                        !imageUrl || imageError
                            ? require("../../assets/avatar.png")
                            : { uri: `${BASE_URL}/storage/${item.book.image_url}` }
                    }
                    className="w-[90px] h-[90px] rounded-md mr-3"
                    resizeMode="contain"
                    onError={() => setImageError(true)}
                />
                <View className="flex-1">
                    <Text className="text-lg font-bold">{item.book.title}</Text>
                    <Text className="text-sm text-gray-600">
                        Dipinjam: {new Date(item.loan_date).toLocaleDateString()}
                    </Text>
                    <Text className="text-sm text-gray-600">
                        Kembali Maks: {new Date(item.return_date).toLocaleDateString()}
                    </Text>

                    <Text className="mt-1 text-sm font-semibold">
                        Status:
                        {item.status === 'borrowed' && <Text className="text-yellow-600"> Dipinjam</Text>}
                        {item.status === 'pending_return' && <Text className="text-blue-600"> Menunggu Konfirmasi Admin</Text>}
                        {item.status === 'returned' && <Text className="text-green-600"> Sudah Dikembalikan</Text>}
                    </Text>

                    {item.status === 'borrowed' && (
                        <View className="flex-row mt-3">
                            <TouchableOpacity
                                onPress={() => onReturn(item.id)}
                                className="px-4 py-2 mr-3 bg-green-600 rounded">
                                <Text className="font-medium text-white">Kembalikan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onCancel(item.id)}
                                className="px-4 py-2 bg-red-600 rounded">
                                <Text className="font-medium text-white">Batalkan</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default function LoanScreen() {
    const [loans, setLoans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const fetchLoans = async () => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            const res = await axios.get(`${BASE_URL}/api/loans`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setLoans(res.data.data);
            }
        } catch (err) {
            console.error("Gagal ambil data peminjaman:", err);
            Alert.alert("Error", "Gagal mengambil data peminjaman.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);
            fetchLoans();
        });
        return unsubscribe;
    }, [navigation]);

    const handleRequestReturn = async (id) => {
        try {
            const token = await AsyncStorage.getItem("auth_token");
            const response = await axios.post(
                `${BASE_URL}/api/loans/${id}/request-return`, // Call the new endpoint
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                Alert.alert("Berhasil", "Permintaan pengembalian telah dikirim. Harap serahkan buku kepada admin untuk konfirmasi.");
                fetchLoans(); // Refresh the list to show the new 'pending_return' status
            }
        } catch (err) {
            const message = err.response?.data?.message || "Gagal mengajukan pengembalian buku.";
            Alert.alert("Error", message);
        }
    };

    const handleCancel = async (id) => {
        Alert.alert("Konfirmasi", "Yakin ingin membatalkan peminjaman ini?", [
            { text: "Tidak", style: "cancel" },
            {
                text: "Ya",
                onPress: async () => {
                    try {
                        const token = await AsyncStorage.getItem("auth_token");
                        await axios.delete(`${BASE_URL}/api/loans/${id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        Alert.alert("Berhasil", "Peminjaman telah dibatalkan.");
                        fetchLoans();
                    } catch (err) {
                        Alert.alert("Error", "Gagal membatalkan peminjaman.");
                    }
                },
            },
        ]);
    };

    if (isLoading) {
        return (
            <View className="items-center justify-center flex-1">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View className="flex-1 px-4 pt-4 bg-white">
            <Text className="mb-4 text-2xl font-bold text-gray-800">📖 Daftar Peminjaman Saya</Text>
            <FlatList
                data={loans}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LoanCard
                        item={item}
                        onReturn={handleRequestReturn}
                        onCancel={handleCancel}
                    />
                )}
                ListEmptyComponent={
                    <View className="items-center justify-center mt-20">
                        <Text className="text-gray-500">Anda belum memiliki riwayat peminjaman.</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}
