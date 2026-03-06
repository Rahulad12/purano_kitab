import globalStyles from "@/app/style/global";
import React from "react";
import { ScrollView, StyleSheet, Text, ViewStyle } from "react-native";

export interface PageScrollLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const PageScrollLayout = ({
  title,
  subtitle,
  children,
  style,
}: PageScrollLayoutProps) => {
  return (
    <ScrollView
      style={[globalStyles.container, style]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {title && <Text style={globalStyles.subHeading}>{title}</Text>}
      {subtitle && <Text style={globalStyles.paragraph}>{subtitle}</Text>}

      {children}
    </ScrollView>
  );
};

export default PageScrollLayout;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
