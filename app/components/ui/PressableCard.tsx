import COLORS from "@/app/style/primaryColor";
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
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
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </Pressable>
  );
};

export default PressableCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 3,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: COLORS.text,
  },
  description: {
    fontSize: 14,
    color: COLORS.lightText,
  },
});
