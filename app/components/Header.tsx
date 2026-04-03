import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGetFavorite } from "../api/hooks/favorite";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "../style";

interface HeaderProps {
  onProfilePress?: () => void;
}

const Header = ({ onProfilePress }: HeaderProps) => {
  const { data: favoriteData } = useGetFavorite();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.md,
        },
      ]}
    >
      <View
        style={[
          styles.topBar,
          {
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.logoText, { color: theme.colors.primary }]}>
          PuranoKitab
        </Text>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() => router.push("/protected/allListedbook/favorite")}
            style={styles.heartIcon}
          >
            {favoriteData && favoriteData?.favorites?.length > 0 ? (
              <MaterialIcons
                name="favorite"
                size={24}
                color={theme.colors.secondary}
              />
            ) : (
              <MaterialIcons
                name="favorite"
                size={24}
                color={theme.colors.textSecondary}
              />
            )}
            {favoriteData?.favorites.length &&
              favoriteData.favorites.length > 0 && (
                <Text
                  style={[styles.badgeText, { color: theme.colors.primary }]}
                >
                  {favoriteData.favorites.length}
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onProfilePress}>
            <Ionicons
              name="person-circle-outline"
              size={28}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.md,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
  },
  logoText: {
    ...TYPOGRAPHY.h4,
  },
  heartIcon: {
    position: "relative",
  },
  badgeText: {
    position: "absolute",
    right: -8,
    top: -12,
    fontWeight: "800",
    fontSize: 12,
  },
});

export default Header;
