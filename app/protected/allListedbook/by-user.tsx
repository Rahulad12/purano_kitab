import { useGetBookByUser } from "@/app/api/hooks/books";
import BookLoader from "@/app/components/common/Loader";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import PressableCard from "@/app/components/ui/PressableCard";
import { BookDetails } from "@/app/types";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ListedBookCard = ({ book }: { book: BookDetails }) => {
  return (
    <PressableCard
      style={styles.card}
      onPress={() => {
        router.push(`/protected/allListedbook/${book._id}`);
      }}
    >
      <Image
        source={{ uri: book.image_url }}
        style={styles.bookCover}
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {book.author}
        </Text>
        <Text style={styles.bookDescription} numberOfLines={3}>
          {book.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>Rs. {book.price}</Text>
          <View
            style={[
              styles.badge,
              book.isSold
                ? styles.badgeSold
                : book.isAvailable
                  ? styles.badgeAvailable
                  : styles.badgeUnavailable,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                book.isSold
                  ? styles.badgeSoldText
                  : book.isAvailable
                    ? styles.badgeAvailableText
                    : styles.badgeUnavailableText,
              ]}
            >
              {book.isSold
                ? "Sold"
                : book.isAvailable
                  ? "Available"
                  : "Unavailable"}
            </Text>
          </View>
        </View>
      </View>
    </PressableCard>
  );
};

const ListedByUser = () => {
  const { data: bookData, isFetching: isLoading } = useGetBookByUser();

  const books = bookData?.books ?? [];

  return (
    <PageScrollLayout
      title="My Listings"
      headerChildren={
        <View style={styles.header}>
          <Text style={styles.headerCount}>
            {books.length} {books.length === 1 ? "book" : "books"}
          </Text>
        </View>
      }
    >
      {/* Loading State */}
      {isLoading && <BookLoader />}

      {/* Empty State */}
      {!isLoading && books.length === 0 && (
        <View style={styles.centerBox}>
          <Text style={styles.emptyIcon}>🏷️</Text>
          <Text style={styles.emptyTitle}>No listings yet</Text>
          <Text style={styles.emptySubtitle}>
            Books you list for sale will appear here.
          </Text>
        </View>
      )}

      {/* Book List */}
      {!isLoading &&
        books.map((book) => <ListedBookCard key={book._id} book={book} />)}
    </PageScrollLayout>
  );
};

export default ListedByUser;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1C1008",
    letterSpacing: -0.5,
  },
  headerCount: {
    fontSize: 13,
    color: "#9A8672",
    fontWeight: "500",
  },

  // Card
  card: {
    flexDirection: "row",
  },
  bookCover: {
    width: 90,
    height: 130,
    backgroundColor: "#E8DDD0",
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C1008",
    lineHeight: 20,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    color: "#B07D4A",
    fontWeight: "600",
    marginBottom: 6,
  },
  bookDescription: {
    fontSize: 11,
    color: "#7A6E63",
    lineHeight: 16,
    flex: 1,
  },

  // Footer inside card
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1008",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeAvailable: {
    backgroundColor: "#E6F4EA",
  },
  badgeSold: {
    backgroundColor: "#FCE8E8",
  },
  badgeUnavailable: {
    backgroundColor: "#F3F0EC",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  badgeAvailableText: {
    color: "#2D6A4F",
  },
  badgeSoldText: {
    color: "#C0392B",
  },
  badgeUnavailableText: {
    color: "#9A8672",
  },

  // Empty / Loading
  centerBox: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1008",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#9A8672",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: "#9A8672",
  },
});
