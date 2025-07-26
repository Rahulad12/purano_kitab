import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { globalStyles } from '../style/global';
const fallbackImg = 'https://via.placeholder.com/100x150.png?text=No+Image';

const FeaturedBooks = () => {
    const books = [
        { id: 1, img: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU', title: 'Book One', price: '100' },
        { id: 2, img: '', title: 'Book Two', price: '100' },
        { id: 3, img: '', title: 'Book Three', price: '100' },
        { id: 4, img: '', title: 'Book Four', price: '100' },
        { id: 5, img: '', title: 'Book Five', price: '100' },
        { id: 6, img: '', title: 'Book Six', price: '100' },
        { id: 7, img: '', title: 'Book Seven', price: '100' },
    ];

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.subHeading}>Featured Books</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={globalStyles.scrollView}
            >
                {books.map((book) => (
                    <View key={book.id} style={styles.bookCard}>
                        <Image
                            source={{ uri: book.img || fallbackImg }}
                            style={styles.bookImage}
                            resizeMode="cover"
                        />
                        <View style={styles.bookInfo}>
                            <Text style={globalStyles.paragraph} numberOfLines={1}>
                                {book.title}
                            </Text>
                            <Text style={globalStyles.smallText}>Rs. {book.price}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    bookCard: {
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginRight: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    bookImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#eee',
    },
    bookInfo: {
        padding: 8,
    },
    bookPrice: {
        fontSize: 13,
        color: '#007bff',
        marginTop: 4,
    },
});

export default FeaturedBooks;
