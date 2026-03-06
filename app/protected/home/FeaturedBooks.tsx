import CardSkeleton from "@/app/components/common/skeletonLoader/card-skeleton";
import Card from "@/app/components/ui/Card";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import globalStyles from "@/app/style/global";
import { BookDetails } from "@/app/types";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

interface Props {
  books: BookDetails[];
  isLoading: boolean;
}
const FeaturedBooks = ({ books, isLoading }: Props) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subHeading}>Featured Books</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.scrollView}
      >
        {isLoading
          ? [...Array(4)].map((_, index) => <CardSkeleton key={index} />)
          : books?.map((book) => (
              <Card key={book._id} style={styles.bookCard}>
                <BookImageWithSkeleton
                  uri={book.image_url || fallbackImg}
                  containerStyle={styles.bookImage}
                />
                <View style={styles.bookInfo}>
                  <Text numberOfLines={1}>{book.title}</Text>
                  <Text style={globalStyles.priceText}>Rs. {book.price}</Text>
                </View>
              </Card>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    width: 200,
    height: "auto",
    marginHorizontal: 4,
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#eee",
  },
  bookInfo: {
    padding: 8,
  },
});

export default FeaturedBooks;
