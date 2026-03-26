import { useGetFeaturedBooks } from "@/app/api/hooks/books";
import CardSkeleton from "@/app/components/common/skeletonLoader/card-skeleton";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import PressableCard from "@/app/components/ui/PressableCard";
import globalStyles from "@/app/style/global";
import COLORS from "@/app/style/primaryColor";
import { BookDetails } from "@/app/types";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

interface Props {
  books: BookDetails[];
  isLoading: boolean;
}
const FeaturedBooks = ({ books, isLoading }: Props) => {
  const { data: featuredBooks, isLoading: featuredBooksLoading } =
    useGetFeaturedBooks();
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subHeading}>Featured Books</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.scrollView}
      >
        {featuredBooksLoading
          ? [...Array(4)].map((_, index) => <CardSkeleton key={index} />)
          : featuredBooks?.books?.map((book: BookDetails) => (
              <PressableCard
                key={book._id}
                style={styles.bookCard}
                onPress={() =>
                  router.push(`/protected/allListedbook/${book._id}`)
                }
              >
                <BookImageWithSkeleton
                  uri={book.image_url || fallbackImg}
                  containerStyle={styles.bookImage}
                />
                <View style={styles.bookInfo}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: COLORS.text,
                    }}
                  >
                    {book.title}
                  </Text>
                  <Text style={globalStyles.priceText}>Rs. {book.price}</Text>
                </View>
              </PressableCard>
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
