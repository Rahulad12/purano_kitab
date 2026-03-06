import COLORS from "@/app/style/primaryColor";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
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
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
    </View>
  );
};

export default Card;

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
