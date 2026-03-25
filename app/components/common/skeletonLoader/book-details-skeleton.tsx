import COLORS from "@/app/style/primaryColor";
import { StyleSheet, View } from "react-native";
import Card from "../../ui/Card";
import PageScrollLayout from "../../ui/PageScrollLayout";
import { Skeleton } from "../skeleton-block";

const BookDetailsSkeleton = () => (
  <PageScrollLayout style={styles.container}>
    {/* Hero image skeleton */}
    <View style={[styles.heroImage, styles.skeletonBox]} />

    <View style={styles.content}>
      {/* Title row */}
      <View style={styles.titleRow}>
        <View style={{ flex: 1, paddingRight: 12, gap: 8 }}>
          <Skeleton height={22} width="80%" />
          <Skeleton height={14} width="45%" />
        </View>
        <Skeleton height={26} width={72} style={{ borderRadius: 20 }} />
      </View>

      <View style={styles.divider} />

      {/* About card */}
      <Card style={styles.sectionCard}>
        <Skeleton height={13} width="38%" style={{ marginBottom: 14 }} />
        <Skeleton height={12} style={{ marginBottom: 8 }} />
        <Skeleton height={12} width="95%" style={{ marginBottom: 8 }} />
        <Skeleton height={12} width="80%" style={{ marginBottom: 8 }} />
        <Skeleton height={12} width="60%" />
      </Card>

      {/* Seller card */}
      <Card style={styles.sectionCard}>
        <Skeleton height={13} width="42%" style={{ marginBottom: 14 }} />
        <View style={[styles.sellerRow, { marginBottom: 14 }]}>
          <Skeleton height={50} width={50} style={{ borderRadius: 25 }} />
          <View style={{ gap: 8 }}>
            <Skeleton height={14} width={130} />
            <Skeleton height={12} width={90} />
          </View>
        </View>
        <Skeleton height={44} style={{ borderRadius: 10, marginBottom: 8 }} />
        <Skeleton height={44} style={{ borderRadius: 10 }} />
      </Card>

      {/* CTA row */}
      <View style={styles.ctaRow}>
        <Skeleton height={52} style={{ flex: 1, borderRadius: 14 }} />
        <Skeleton height={52} style={{ flex: 1, borderRadius: 14 }} />
      </View>
    </View>
  </PageScrollLayout>
);

export default BookDetailsSkeleton;
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
