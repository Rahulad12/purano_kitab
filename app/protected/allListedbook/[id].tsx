import { useGetBookById } from "@/app/api/hooks/books";
import {
  useGetFavorite,
  useSaveBookAsFavorite,
} from "@/app/api/hooks/favorite";
import Avatar from "@/app/components/common/Avatar";
import BookDetailsSkeleton from "@/app/components/common/skeletonLoader/book-details-skeleton";
import Card from "@/app/components/ui/Card";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import PageLayout from "@/app/components/ui/PageLayout";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import COLORS from "@/app/style/primaryColor";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

const BookDetails = () => {
  const { id: bookId } = useLocalSearchParams();
  const { data: book, isLoading: isLoadingBook } = useGetBookById(
    bookId as string,
  );
  const { mutateAsync: saveBookAsFavorite, isPending: isSaving } =
    useSaveBookAsFavorite();
  const { data: favoriteBooks } = useGetFavorite();
  const isBookSetAsFavorite = favoriteBooks?.favorites.find(
    (favorite) => favorite.book === bookId,
  );
  const [isFavorited, setIsFavorited] = useState(false);

  const handleBookSaveAsFavorite = async (bookId: string) => {
    if (!bookId || isSaving) return;
    try {
      await saveBookAsFavorite(bookId);
      setIsFavorited(true);
    } catch (error) {
      console.error("Error saving book as favorite:", error);
    }
  };

  if (isLoadingBook) return <BookDetailsSkeleton />;

  if (!book) {
    return (
      <PageLayout title="Book Details" subtitle="Book not found">
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>
            Sorry, the book you're looking for doesn't exist.
          </Text>
        </View>
      </PageLayout>
    );
  }

  const sellerName =
    book?.owner.firstName + " " + book?.owner.lastName || "Unknown Seller";
  const sellerPhone = book?.owner.phoneNumber || null;
  const sellerEmail = book?.owner.email || null;
  const isSellerActive = book?.owner.isActive || false;

  return (
    <PageScrollLayout style={styles.container}>
      {/* ── Full-width hero image ── */}
      <View style={styles.heroWrapper}>
        <BookImageWithSkeleton
          uri={book.image_url || fallbackImg}
          containerStyle={styles.heroImage}
        />

        {/* Favorite pill — top right */}
        <TouchableOpacity
          style={[styles.favButton, isFavorited && styles.favButtonActive]}
          onPress={() => handleBookSaveAsFavorite(bookId as string)}
          activeOpacity={0.8}
          disabled={!!isBookSetAsFavorite || isSaving}
        >
          <Text style={styles.favIcon}>
            {isSaving ? (
              "⏳"
            ) : isBookSetAsFavorite ? (
              <Fontisto name="favorite" size={24} color={COLORS.secondary} />
            ) : (
              <Fontisto
                name="favorite"
                size={24}
                color="black"
                lineBreakMode="clip"
              />
            )}
          </Text>
          <Text style={styles.favLabel}></Text>
        </TouchableOpacity>

        {/* Price badge — bottom left of image */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>Rs. {book?.price}</Text>
        </View>
      </View>

      {/* ── Main content ── */}
      <View style={styles.content}>
        {/* Title + author */}
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{book?.title}</Text>
            <Text style={styles.author}>by {book?.author}</Text>
          </View>
          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>
              {book?.isAvailable ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Description */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>About this book</Text>
          <Text style={styles.description}>{book?.description}</Text>
        </Card>

        {/* Seller info */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Seller Information</Text>

          <View style={styles.sellerRow}>
            <Avatar
              firstName={book.owner.firstName || ""}
              style={{ width: 50, height: 50 }}
              textStyle={{ fontSize: 25 }}
            />
            <View>
              <Text style={styles.sellerName}>{sellerName}</Text>
              <Text style={styles.sellerSub}>
                {isSellerActive ? "Verified Seller" : "Unverified Seller"}
              </Text>
            </View>
          </View>

          <View style={styles.contactRow}>
            {sellerPhone && (
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => Linking.openURL(`tel:${sellerPhone}`)}
                activeOpacity={0.8}
              >
                <Fontisto name="phone" size={20} color={COLORS.lightText} />
                <Text style={styles.contactText}>{sellerPhone}</Text>
              </TouchableOpacity>
            )}
            {sellerEmail && (
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => Linking.openURL(`mailto:${sellerEmail}`)}
                activeOpacity={0.8}
              >
                <Fontisto name="email" size={24} color={COLORS.lightText} />
                <Text style={styles.contactText}>{sellerEmail}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>

        {/* Bottom CTA */}
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={[styles.ctaBtn, styles.ctaSecondary]}
            onPress={() => handleBookSaveAsFavorite(bookId as string)}
            disabled={isSaving || !!isBookSetAsFavorite}
            activeOpacity={0.8}
          >
            <Fontisto
              name={isBookSetAsFavorite ? "heart" : "heart-alt"}
              size={20}
              color={isBookSetAsFavorite ? COLORS.secondary : COLORS.text}
            />
            <Text style={styles.ctaSecondaryText}>
              {isBookSetAsFavorite ? "Saved" : "Wishlist"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ctaBtn, styles.ctaPrimary]}
            onPress={() => sellerPhone && Linking.openURL(`tel:${sellerPhone}`)}
            activeOpacity={0.8}
          >
            <Fontisto name="phone" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </PageScrollLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Skeleton ──
  skeletonBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },

  // ── Hero image ──
  heroWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 0,
  },
  heroImage: {
    width: "100%",
    height: 420,
    borderRadius: 0,
    backgroundColor: "#f0f0f0",
  },
  favButton: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.93)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  favButtonActive: {
    backgroundColor: "#FFF0F0",
  },
  favIcon: {
    fontSize: 16,
  },
  favLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  priceBadge: {
    position: "absolute",
    bottom: 14,
    left: 14,
    backgroundColor: COLORS.price,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // ── Content ──
  content: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.secondary,
    lineHeight: 30,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  stockBadge: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  stockText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 16,
  },

  // ── Section cards ──
  sectionCard: {
    padding: 16,
    width: "100%",
    borderRadius: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.lightText,
  },

  // ── Seller ──
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  sellerName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  sellerSub: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },
  contactRow: {
    gap: 8,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },

  // ── CTA row ──
  ctaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  ctaBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaPrimary: {
    backgroundColor: COLORS.primary,
  },
  ctaPrimaryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  ctaSecondary: {
    backgroundColor: "#F1F5F9",
    flexDirection: "row",
    gap: 8,
  },
  ctaSecondaryText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },

  // ── Not found ──
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 15,
    color: COLORS.lightText,
    textAlign: "center",
  },
});

export default BookDetails;
