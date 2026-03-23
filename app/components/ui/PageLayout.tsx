import globalStyles from "@/app/style/global";
import React from "react";
import { ScrollView, StyleSheet, Text, ViewStyle } from "react-native";

export interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const PageLayout = ({ title, subtitle, children, style }: PageLayoutProps) => {
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

export default PageLayout;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
});
