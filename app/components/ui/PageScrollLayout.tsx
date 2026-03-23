import globalStyles from "@/app/style/global";
import React from "react";
import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";

export interface PageScrollLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  headerChildren?: React.ReactNode;
  contentContainerStyle?: ViewStyle | ViewStyle[];
}

const PageScrollLayout = ({
  title,
  subtitle,
  children,
  style,
  headerChildren,
  contentContainerStyle,
}: PageScrollLayoutProps) => {
  const hasHeader = title || subtitle || headerChildren;

  return (
    <ScrollView
      style={[globalStyles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {hasHeader && (
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            {title && <Text style={globalStyles.subHeading}>{title}</Text>}
            {subtitle && <Text style={globalStyles.paragraph}>{subtitle}</Text>}
          </View>
          {headerChildren && (
            <View style={styles.headerChildren}>{headerChildren}</View>
          )}
        </View>
      )}
      {children}
    </ScrollView>
  );
};

export default PageScrollLayout;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  headerChildren: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 12,
  },
  content: {
    flexGrow: 1,
  },
});
