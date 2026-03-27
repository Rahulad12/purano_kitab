import { useGetBooks } from "@/app/api/hooks/books";
import BookImageWithSkeleton from "@/app/components/ui/ImageWithLoader";
import Input from "@/app/components/ui/Input";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import PressableCard from "@/app/components/ui/PressableCard";
import globalStyles from "@/app/style/global";
import COLORS from "@/app/style/primaryColor";
import { BookDetails, GetBooksParams } from "@/app/types";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";

const AllBooks = () => {
  const params = useLocalSearchParams<{
    search?: string;
    author?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
  }>();

  // Search terms (title + author searched together)
  const [search, setSearch] = useState(params.search || "");
  const [author, setAuthor] = useState(params.author || "");

  // Filter values
  const [minPrice, setMinPrice] = useState(params.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || "");
  const [category, setCategory] = useState(params.category || "");

  // Toggle filter panel visibility
  const [showFilters, setShowFilters] = useState(false);

  // Track active applied params (so UI only refetches on explicit apply/search)
  const [appliedParams, setAppliedParams] = useState<GetBooksParams>({
    page: 1,
    limit: 20,
    search: params.search || undefined,
    author: params.author || undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    category: params.category || undefined,
  });

  const { data: books, isLoading: booksLoading } = useGetBooks(appliedParams);

  const goToBook = (id: string) => {
    router.push(`/protected/allListedbook/${id}`);
  };

  const handleApply = () => {
    const newParams: GetBooksParams = {
      page: 1,
      limit: 20,
      search: search || undefined,
      author: author || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      category: category || undefined,
    };
    setAppliedParams(newParams);
    router.setParams({
      search: search || undefined,
      author: author || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      category: category || undefined,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSearch("");
    setAuthor("");
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    const cleared: GetBooksParams = { page: 1, limit: 20 };
    setAppliedParams(cleared);
    router.setParams({});
  };

  const activeFilterCount = [
    appliedParams.search,
    appliedParams.author,
    appliedParams.minPrice,
    appliedParams.maxPrice,
    appliedParams.category,
  ].filter(Boolean).length;

  const SkeletonCard = () => (
    <View style={styles.bookCard}>
      <View style={[styles.bookImage, styles.skeletonBox]} />
      <View style={styles.bookInfo}>
        <View style={[styles.skeletonBox, styles.skeletonTitle]} />
        <View style={[styles.skeletonBox, styles.skeletonAuthor]} />
        <View style={[styles.skeletonBox, styles.skeletonPrice]} />
      </View>
    </View>
  );

  return (
    <PageScrollLayout title="All Listed Books" subtitle="Find all Listed books">
      {/* ── Search bar row ── */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrapper}>
          <Input
            placeholder="Search by title..."
            onChangeText={setSearch}
            value={search}
            rightIcon={<EvilIcons name="search" size={24} color="black" />}
            onRightIconPress={handleApply}
            onSubmitEditing={handleApply}
          />
        </View>

        {/* Filter toggle button */}
        <TouchableOpacity
          style={[
            styles.filterBtn,
            activeFilterCount > 0 && styles.filterBtnActive,
          ]}
          onPress={() => setShowFilters((v) => !v)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="options-outline"
            size={24}
            color={activeFilterCount > 0 ? "#fff" : COLORS.primary}
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Collapsible filter panel ── */}
      {showFilters && (
        <View style={styles.filterPanel}>
          <Text style={styles.filterPanelTitle}>Filters</Text>

          {/* Author */}
          <Text style={styles.filterLabel}>Author</Text>
          <Input
            placeholder="Filter by author..."
            onChangeText={setAuthor}
            value={author}
          />

          {/* Price range */}
          <Text style={styles.filterLabel}>Price Range (Rs.)</Text>
          <View style={styles.priceRow}>
            <View style={styles.priceInput}>
              <Input
                placeholder="Min"
                onChangeText={setMinPrice}
                value={minPrice}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.priceSeparator}>–</Text>
            <View style={styles.priceInput}>
              <Input
                placeholder="Max"
                onChangeText={setMaxPrice}
                value={maxPrice}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Category */}
          <Text style={styles.filterLabel}>Category</Text>
          <Input
            placeholder="e.g. Fiction, Science..."
            onChangeText={setCategory}
            value={category}
          />

          {/* Action buttons */}
          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={handleClearFilters}
              activeOpacity={0.8}
            >
              <Text style={styles.clearBtnText}>Clear All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={handleApply}
              activeOpacity={0.8}
            >
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Active filter chips ── */}
      {activeFilterCount > 0 && (
        <View style={styles.chipRow}>
          {appliedParams.search && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>"{appliedParams.search}"</Text>
            </View>
          )}
          {appliedParams.author && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>By: {appliedParams.author}</Text>
            </View>
          )}
          {(appliedParams.minPrice || appliedParams.maxPrice) && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>
                Rs. {appliedParams.minPrice ?? 0} –{" "}
                {appliedParams.maxPrice ?? "∞"}
              </Text>
            </View>
          )}
          {appliedParams.category && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{appliedParams.category}</Text>
            </View>
          )}
          <TouchableOpacity onPress={handleClearFilters}>
            <Text style={styles.clearChipText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Book grid ── */}
      {booksLoading ? (
        <View style={styles.booksWrapper}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      ) : books?.length === 0 ? (
        <Text style={styles.emptyText}>No books found.</Text>
      ) : (
        <View style={styles.booksWrapper}>
          {books?.map((book: BookDetails) => (
            <PressableCard
              key={book._id}
              style={styles.bookCard}
              onPress={() => goToBook(book._id.toString())}
            >
              <BookImageWithSkeleton
                uri={book.image_url || fallbackImg}
                containerStyle={styles.bookImage}
              />
              <View style={styles.bookInfo}>
                <Text numberOfLines={2}>{book.title}</Text>
                <Text style={globalStyles.paragraph}>{book.author}</Text>
                <Text style={globalStyles.priceText}>
                  Rs. {book.price || 0}
                </Text>
              </View>
            </PressableCard>
          ))}
        </View>
      )}
    </PageScrollLayout>
  );
};

export default AllBooks;

const styles = StyleSheet.create({
  /* Search row */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  searchInputWrapper: {
    flex: 1,
    height: 46,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#e91e63",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  filterBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  /* Filter panel */
  filterPanel: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  filterPanelTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginTop: 10,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priceInput: {
    flex: 1,
  },
  priceSeparator: {
    fontSize: 18,
    color: "#999",
    marginBottom: 4,
  },
  filterActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 16,
  },
  clearBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#ccc",
  },
  clearBtnText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
  applyBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  applyBtnText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "700",
  },

  /* Active filter chips */
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  chipText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "500",
  },
  clearChipText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: "600",
    marginLeft: 4,
  },

  skeletonBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
  },
  skeletonTitle: {
    height: 14,
    width: "85%",
    marginBottom: 6,
  },
  skeletonAuthor: {
    height: 12,
    width: "60%",
    marginBottom: 6,
  },
  skeletonPrice: {
    height: 12,
    width: "40%",
  },

  /* Book grid */
  booksWrapper: {
    maxWidth: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  bookCard: {
    flexGrow: 1,
    width: 200,
    height: "auto",
  },
  bookImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#f2f2f2",
  },
  bookInfo: {
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#999",
  },
});
