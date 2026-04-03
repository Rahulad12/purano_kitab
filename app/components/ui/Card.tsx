import { useTheme } from "@/app/context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "@/app/style";
import React from "react";
import { Platform, StyleSheet, Text, View, ViewStyle } from "react-native";

export interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const Card = ({
  title,
  description,
  children,
  style,
}: React.PropsWithChildren<CardProps>) => {
  const { theme } = useTheme();

  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : { elevation: 3 };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        shadowStyle,
        style,
      ]}
    >
      {title && (
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
      )}
      {description && (
        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
        >
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  title: {
    ...TYPOGRAPHY.h6,
    marginBottom: SPACING.sm,
  },
  description: {
    ...TYPOGRAPHY.bodyMedium,
  },
});

export default Card;
