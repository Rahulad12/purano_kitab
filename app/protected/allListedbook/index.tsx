import { useGetBooks } from "@/app/api/hooks/books";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import PressableCard from "@/app/components/ui/PressableCard";
import globalStyles from "@/app/style/global";
import { BookDetails } from "@/app/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

const AllBooks = () => {
  const { data: books } = useGetBooks();
  console.log(books);
  const goToBook = (id: string) =>
    router.push(`/protected/allListedbook/${id}`);

  return (
    <PageScrollLayout title="All Listed Books" subtitle="Find all Listed books">
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search Books..."
          style={styles.searchInput}
          placeholderTextColor="#666"
        />
      </View>
      {books?.length === 0 ? (
        <Text style={styles.emptyText}>No books available.</Text>
      ) : (
        <View style={styles.booksWrapper}>
          {books?.map((book: BookDetails) => (
            <PressableCard
              key={book._id}
              style={styles.bookCard}
              onPress={() => goToBook(book._id.toString())}
            >
              <Image
                source={{ uri: book.image_url || fallbackImg }}
                style={styles.bookImage}
                resizeMode="cover"
              />
              <View style={styles.bookInfo}>
                <Text numberOfLines={2}>{book.title}</Text>
                <Text style={globalStyles.paragraph}>{book.author}</Text>
                <Text style={globalStyles.priceText}>
                  Rs. {book.price || 0}
                </Text>
              </View>
            </PressableCard>
          ))}
        </View>
      )}
    </PageScrollLayout>
  );
};

export default AllBooks;

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: "auto",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#ddd",
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
    color: "#000",
  },

  booksWrapper: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  bookCard: {
    flexGrow: 1,
    width: 200,
    height: "auto",
  },
  bookImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#f2f2f2",
  },
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  bookPrice: {
    fontSize: 13,
    color: "#e91e63",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#999",
  },
});
