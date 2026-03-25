import { useGetCategories } from "@/app/api/hooks/category";
import Input from "@/app/components/ui/Input";
import globalStyles from "@/app/style/global";
import { GetBooksParams } from "@/app/types";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState<GetBooksParams>({
    search: "",
    author: "",
    limit: 10,
    page: 1,
    minPrice: 0,
    maxPrice: 10000,
    category: "",
  });
  //mutation
  const { data: categories, isLoading: categoryLoading } = useGetCategories();

  const handleSearch = () => {
    if (searchQuery?.search?.trim()) {
      router.push(
        `/protected/allListedbook?search=${encodeURIComponent(
          searchQuery?.search?.trim() || "",
        )}&category=${encodeURIComponent(searchQuery.category || "")}`,
      );
    }
  };
  return (
    <View style={{ ...globalStyles.container }}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search Books..."
          onChangeText={(text) =>
            setSearchQuery((prev) => ({ ...prev, search: text }))
          }
          value={searchQuery.search || ""}
          rightIcon={<EvilIcons name="search" size={24} color="black" />}
          onRightIconPress={handleSearch}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Horizontal Scroll Buttons */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonScrollContainer}
      >
        {categories?.map((category: CategoryResponse, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSearchQuery((prev) => ({
                ...prev,
                category: category.category,
              }));
            }}
            style={globalStyles.button}
          >
            {categoryLoading ? (
              <Text style={globalStyles.paragraph}>Loading...</Text>
            ) : (
              <Text style={globalStyles.paragraph}>
                {category?.category || "Unknown"}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: "row",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 60,
    fontSize: 16,
    color: "#000",
  },
  buttonScrollContainer: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default Hero;
