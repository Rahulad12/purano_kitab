import { GetBooksParams, useGetBooks } from "@/app/api/hooks/books";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import Input from "@/app/components/ui/Input";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import PressableCard from "@/app/components/ui/PressableCard";
import globalStyles from "@/app/style/global";
import COLORS from "@/app/style/primaryColor";
import { BookDetails } from "@/app/types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

const AllBooks = () => {
  const params = useLocalSearchParams<{
    search?: string;
    author?: string;
    minPrice?: string;
    maxPrice?: string;
  }>();

  const [search, setSearch] = useState(params.search || "");
  const [author, setAuthor] = useState(params.author || "");
  const [minPrice, setMinPrice] = useState(params.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || "");

  const bookParams: GetBooksParams = {
    page: 1,
    limit: 20,
    search: search || undefined,
    author: author || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  };

  const { data: books, isLoading: booksLoading } = useGetBooks(bookParams);

  const goToBook = (id: string) => {
    router.push(`/protected/allListedbook/${id}`);
  };

  const handleSearch = () => {
    router.setParams({
      search: search || undefined,
      author: author || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  if (booksLoading)
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={{ marginTop: 20, alignSelf: "center" }}
      />
    );

  return (
    <PageScrollLayout title="All Listed Books" subtitle="Find all Listed books">
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search Books..."
          onChangeText={setSearch}
          value={search}
          rightIcon={<EvilIcons name="search" size={24} color="black" />}
          onRightIconPress={handleSearch}
          onSubmitEditing={handleSearch}
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
              <BookImageWithSkeleton
                uri={book.image_url || fallbackImg}
                containerStyle={styles.bookImage}
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
