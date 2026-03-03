import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import books from '../../data/book';
import globalStyles from '../../style/global';

const fallbackImg = 'https://via.placeholder.com/100x150.png?text=No+Image';

const AllBooks = () => {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.subHeading}>
                All Books
            </Text>
            <View>
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search Books..."
                        style={styles.searchInput}
                        placeholderTextColor="#666"
                    />
                </View>
                {books.length === 0 ? (
                    <Text style={styles.emptyText}>No books available.</Text>
                ) : (
                    <View style={styles.booksWrapper}>
                        {books.map((book) => (
                            <View key={book.id} style={styles.bookCard}>
                                <Image
                                    source={{ uri: book.img || fallbackImg }}
                                    style={styles.bookImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.bookInfo}>
                                    <Text style={styles.bookTitle} numberOfLines={2}>
                                        {book.title}
                                    </Text>
                                    <Text style={styles.bookPrice}>Rs. {book.price}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>

        </ScrollView>
    );
};

export default AllBooks;

const styles = StyleSheet.create({
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSpacing: {
        marginLeft: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 60,
        fontSize: 16,
        color: '#000',
    },

    booksWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bookCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    bookImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#f2f2f2',
    },
    bookInfo: {
        padding: 10,
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    bookPrice: {
        fontSize: 13,
        color: '#e91e63',
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#999',
    },
});
