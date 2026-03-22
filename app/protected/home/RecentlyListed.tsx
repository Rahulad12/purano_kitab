import CardSkeleton from "@/app/components/common/skeletonLoader/card-skeleton";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import globalStyles from "@/app/style/global";
import { BookDetails } from "@/app/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  books: BookDetails[];
  isLoading: boolean;
  handleFavSave: (bookId: string) => void;
}

const RecentlyListed = ({ books, isLoading, handleFavSave }: Props) => {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subHeading}>Recently Listed</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {isLoading
          ? // Show 4 skeleton cards while loading the list
            [...Array(4)].map((_, index) => (
              <CardSkeleton key={index} cardWidth={"95%"} />
            ))
          : // Show actual books, sorted and limited to 4
            books
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              ?.slice(0, 4)
              ?.map((book) => (
                <Card key={book._id} style={styles.bookCard}>
                  <BookImageWithSkeleton
                    uri={book.image_url}
                    containerStyle={styles.bookImage}
                  />

                  <View style={styles.cardContent}>
                    <View style={styles.textGroup}>
                      <Text style={globalStyles.paragraph} numberOfLines={1}>
                        {book.title}
                      </Text>
                      <Text
                        style={{
                          ...globalStyles.paragraph,
                          fontWeight: "bold",
                        }}
                      >
                        {book.author}
                      </Text>
                      <Text style={globalStyles.priceText}>
                        Rs. {book.price}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleFavSave(book._id)}
                      style={styles.likeButton}
                    >
                      <Ionicons
                        name="heart-outline"
                        size={20}
                        color="#ff4444"
                      />
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
