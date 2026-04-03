import { useTheme } from "@/app/context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "@/app/style";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

const PressableCard = ({
  title,
  description,
  children,
  style,
  onPress,
}: React.PropsWithChildren<CardProps>) => {
  const { theme } = useTheme();

  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.07,
          shadowRadius: 8,
        }
      : { elevation: 3 };

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        shadowStyle,
        style,
      ]}
      onPress={onPress}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.sm,
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

export default PressableCard;
