import { useGetFavorite } from "@/app/api/hooks/favorite";
import CardSkeleton from "@/app/components/common/skeletonLoader/card-skeleton";
import Button from "@/app/components/ui/Button";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import PressableCard from "@/app/components/ui/PressableCard";
import globalStyles from "@/app/style/global";
import COLORS from "@/app/style/primaryColor";
import { BookDetails } from "@/app/types";
import { Fontisto } from "@expo/vector-icons";
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
  const { data: favoriteBooks } = useGetFavorite();

  // ✅ Returns the matched favorite object or undefined
  const isFavorite = (bookId: string) => {
    return favoriteBooks?.favorites?.find((book) => book.book === bookId);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subHeading}>Recently Listed</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <CardSkeleton key={index} cardWidth={"95%"} />
            ))
          : books
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              ?.slice(0, 4)
              ?.map((book) => {
                const favorited = !!isFavorite(book._id);
                return (
                  <PressableCard
                    key={book._id}
                    style={styles.bookCard}
                    onPress={() =>
                      router.push(`/protected/allListedbook/${book._id}`)
                    }
                  >
                    {/* Book Image */}
                    <BookImageWithSkeleton
                      uri={book.image_url}
                      containerStyle={styles.bookImage}
                    />

                    {/* Content */}
                    <View style={styles.cardContent}>
                      <View style={styles.textGroup}>
                        <Text style={styles.bookTitle} numberOfLines={1}>
                          {book.title}
                        </Text>
                        <Text style={styles.bookAuthor} numberOfLines={1}>
                          {book.author}
                        </Text>
                        <Text style={styles.bookPrice}>Rs. {book.price}</Text>
                      </View>

                      {/* Fixed: single Fontisto, no redundant if/else */}
                      <TouchableOpacity
                        style={[styles.favButton]}
                        onPress={() => handleFavSave(book._id)}
                        disabled={favorited}
                        activeOpacity={0.7}
                      >
                        <Fontisto
                          name={favorited ? "heart" : "heart-alt"}
                          size={18}
                          color={
                            favorited ? COLORS.secondary : COLORS.lightText
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </PressableCard>
                );
              })}

        {/* View All */}
        <Button
          style={styles.viewAllButton}
          variant="link"
          onPress={() => router.push("/protected/allListedbook")}
        >
          <Text style={globalStyles.paragraph}>View All →</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
    padding: 10,
    borderRadius: 12,
  },
  bookImage: {
    width: 72,
    height: 104,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textGroup: {
    flex: 1,
    paddingRight: 10,
    gap: 3,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  bookAuthor: {
    fontSize: 12,
    color: COLORS.lightText,
  },
  bookPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.price,
    marginTop: 4,
  },

  // ✅ Heart button with active state
  favButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
  },
  favButtonActive: {
    backgroundColor: COLORS.border,
  },

  viewAllButton: {
    alignItems: "center",
    marginTop: 4,
  },
});

export default RecentlyListed;
