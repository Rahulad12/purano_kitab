import COLORS from "@/app/style/primaryColor";
import React, { useEffect } from "react";
import { Dimensions, DimensionValue, StyleSheet, View } from "react-native";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

interface CardSkeletonProps {
  lines?: number; // number of placeholder lines
  titleWidth?: number | string; // width of the title line (e.g., '60%' or 120)
  lineHeight?: number; // height of each line
  cardWidth?: number | string; // width of the card
  cardHeight?: number | string; // height of the card (if fixed)
  showTitle?: boolean; // whether to show a title line
}

const CardSkeleton = ({
  lines = 2,
  titleWidth = "60%",
  lineHeight = 20,
  cardWidth = 200,
  cardHeight = 100,
  showTitle = true,
}: CardSkeletonProps) => {
  const shimmerTranslateX = useSharedValue(-1);

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false,
    );
  }, []);

  const renderPlaceholder = (customWidth?: number | string, key?: number) => (
    <View
      key={key}
      style={[
        styles.placeholder,
        {
          width:
            typeof customWidth === "string"
              ? Dimensions.get("window").width
              : Number(customWidth),
          height: lineHeight,
          marginBottom: 8,
        },
      ]}
    ></View>
  );

  return (
    <View
      style={[
        styles.card,
        {
          width: cardWidth as DimensionValue,
          height: cardHeight as DimensionValue,
        },
      ]}
    >
      {showTitle && renderPlaceholder(titleWidth, 0)}
      {Array.from({ length: lines }).map((_, index) =>
        renderPlaceholder("100%", index + 1),
      )}
    </View>
  );
};

export default CardSkeleton;

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
  placeholder: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  },
});
