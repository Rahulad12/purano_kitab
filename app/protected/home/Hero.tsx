import Input from "@/app/components/ui/Input";
import globalStyles from "@/app/style/global";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/protected/allListedbook?search=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  const buttonText = [
    { text: "Academic", onPress: () => alert("Academic pressed") },
    { text: "Fiction", onPress: () => alert("Fiction pressed") },
    { text: "Non-Fiction", onPress: () => alert("Non-Fiction pressed") },
    { text: "Entrance Exam", onPress: () => alert("Entrance Exam pressed") },
    { text: "Others", onPress: () => alert("Others pressed") },
  ];

  return (
    <View style={{ ...globalStyles.container }}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search Books..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          rightIcon={<EvilIcons name="search" size={24} color="black" />}
          onRightIconPress={handleSearch}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Horizontal Scroll Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonScrollContainer}
      >
        {buttonText.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={button.onPress}
            style={globalStyles.button}
          >
            <Text style={globalStyles.paragraph}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
