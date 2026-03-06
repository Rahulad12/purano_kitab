import { useGetBookById } from "@/app/api/hooks/books";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import PageLayout from "@/app/components/ui/PageLayout";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import COLORS from "@/app/style/primaryColor";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";
const BookDetails = () => {
  const { id: bookId } = useLocalSearchParams();
  const { data: book } = useGetBookById(bookId as string);

  // Fallback data if book not found
  if (!book) {
    return (
      <PageLayout title="Book Details" subtitle="Book not found">
        <View style={styles.notFound}>
          <Text>Sorry, the book you're looking for doesn't exist.</Text>
        </View>
      </PageLayout>
    );
  }

  return (
    <PageScrollLayout
      title={book?.title}
      subtitle={`by ${book?.author}`}
      style={styles.container}
    >
      <Card style={styles.card}>
        {/* Book Cover */}
        <BookImageWithSkeleton
          uri={book.image_url || fallbackImg}
          containerStyle={styles.image}
        />

        {/* Book Info */}
        <View style={styles.infoSection}>
          <Text style={styles.title}>{book?.title}</Text>
          <Text style={styles.author}>by {book?.author}</Text>

          {/* Rating & Genre Row */}
          {/* <View style={styles.row}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.genre}>{genre}</Text>
            <Text style={styles.pages}>{pages} pages</Text>
          </View> */}

          {/* Price */}
          <Text style={styles.price}>Rs. {book?.price}</Text>

          {/* Description */}
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{book?.description}</Text>
        </View>

        {/* Action Button */}
        <Button variant="ghost">
          <Text>Add to Cart</Text>
        </Button>
      </Card>
    </PageScrollLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: COLORS.background,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  infoSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingContainer: {
    backgroundColor: "#FFE4C4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B25D00",
  },
  genre: {
    fontSize: 14,
    color: COLORS.lightText,
    marginRight: 12,
  },
  pages: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.price,
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.lightText,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default BookDetails;
