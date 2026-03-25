import { StyleSheet, View } from "react-native";

// ── Skeleton for a single listed book card ──
export const ListedBookCardSkeleton = () => (
  <View style={[styles.card, styles.skeletonCard]}>
    {/* Cover placeholder */}
    <View style={[styles.bookCover, styles.skeletonBox]} />

    {/* Info placeholder */}
    <View style={[styles.cardInfo, { gap: 8 }]}>
      {/* Title */}
      <View style={[styles.skeletonBox, { height: 14, width: "75%" }]} />
      <View style={[styles.skeletonBox, { height: 14, width: "55%" }]} />
      {/* Author */}
      <View style={[styles.skeletonBox, { height: 11, width: "40%" }]} />
      {/* Description lines */}
      <View style={[styles.skeletonBox, { height: 10, width: "100%" }]} />
      <View style={[styles.skeletonBox, { height: 10, width: "90%" }]} />
      {/* Footer */}
      <View style={styles.footer}>
        <View style={[styles.skeletonBox, { height: 14, width: 60 }]} />
        <View
          style={[
            styles.skeletonBox,
            { height: 22, width: 64, borderRadius: 20 },
          ]}
        />
      </View>
    </View>
  </View>
);

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

  // ── Skeleton ──
  skeletonBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },
  skeletonCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
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
