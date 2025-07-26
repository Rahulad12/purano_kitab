import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { globalStyles } from '../style/global';

const fallbackImg = 'https://via.placeholder.com/100x150.png?text=No+Image';

const RecentlyListed = () => {
    const router = useRouter();
    const books = [
        {
            id: 1,
            img: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
            title: 'Book One',
            price: '100',
        },
        { id: 2, img: '', title: 'Data Structures & Algorithms', price: '100' },
        { id: 3, img: '', title: 'Book Three', price: '100' },
        { id: 4, img: '', title: 'Book Four', price: '100' },
        { id: 5, img: '', title: 'Book Five', price: '100' },
        { id: 6, img: '', title: 'Book Six', price: '100' },
        { id: 7, img: '', title: 'Book Seven', price: '100' },
    ];

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.subHeading}>Recently Listed</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
                {books.slice(0, 4).map((book) => (
                    <View key={book.id} style={styles.bookCard}>
                        {/* Book Image */}
                        <Image
                            source={{ uri: book.img || fallbackImg }}
                            style={styles.bookImage}
                            resizeMode="cover"
                        />

                        {/* Book Info + Like Button */}
                        <View style={styles.cardContent}>
                            <View style={styles.textGroup}>
                                <Text style={globalStyles.paragraph} numberOfLines={1}>{book.title}</Text>
                                <Text style={globalStyles.smallText}>Rs. {book.price}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => alert(`Liked ${book.title}`)}
                                style={styles.likeButton}
                            >
                                <Ionicons name="heart-outline" size={20} color="#ff4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* View All Button */}
                <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push('/page/allListedbook/AllBooks')}>
                    <Text style={globalStyles.paragraph}>View All</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        backgroundColor: '#fff',
        flex: 1,
    },

    bookCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    bookImage: {
        width: 70,
        height: 100,
        borderRadius: 6,
        backgroundColor: '#eee',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textGroup: {
        flexShrink: 1,
    },

    bookPrice: {
        fontSize: 14,
        color: '#007bff',
        marginTop: 4,
    },
    likeButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#fce4ec',
    },
    viewAllButton: {
        marginTop: 6,
        alignItems: 'center',
    },
    viewAllButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007bff',
    }
});

export default RecentlyListed;
