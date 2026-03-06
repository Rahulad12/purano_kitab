import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import globalStyles from "@/app/style/global";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import books from "../../data/book";

const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

const RecentlyListed = () => {
  const router = useRouter();
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subHeading}>Recently Listed</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {books.slice(0, 4).map((book) => (
          <Card key={book.id} style={styles.bookCard}>
            {/* Book Image */}
            <Image
              source={{ uri: book.img || fallbackImg }}
              style={styles.bookImage}
              resizeMode="cover"
            />

            {/* Book Info + Like Button */}
            <View style={styles.cardContent}>
              <View style={styles.textGroup}>
                <Text style={globalStyles.paragraph} numberOfLines={1}>
                  {book.title}
                </Text>
                <Text style={{ ...globalStyles.paragraph, fontWeight: "bold" }}>
                  {book.author}
                </Text>
                <Text style={globalStyles.priceText}>Rs. {book.price}</Text>
              </View>

              <TouchableOpacity
                onPress={() => alert(`Liked ${book.title}`)}
                style={styles.likeButton}
              >
                <Ionicons name="heart-outline" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        {/* View All Button */}
        <Button
          style={styles.viewAllButton}
          variant="link"
          onPress={() => router.push("/protected/allListedbook")}
        >
          <Text style={globalStyles.paragraph}>View All</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: "#fff",
    flex: 1,
  },

  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textGroup: {
    flexShrink: 1,
  },

  likeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#fce4ec",
  },
  viewAllButton: {
    alignItems: "center",
  },
});

export default RecentlyListed;
