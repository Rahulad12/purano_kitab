import Card from "@/app/components/ui/Card";
import globalStyles from "@/app/style/global";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import books from "../../data/book";
const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

const FeaturedBooks = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subHeading}>Featured Books</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.scrollView}
      >
        {books.map((book) => (
          <Card key={book.id} style={styles.bookCard}>
            <Image
              source={{ uri: book.img || fallbackImg }}
              style={styles.bookImage}
              resizeMode="cover"
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
