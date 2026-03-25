import { View } from "react-native";

export const Skeleton = ({
  width,
  height,
  style,
}: {
  width?: number | string;
  height: number;
  style?: object;
}) => (
  <View
    style={[styles.skeletonBox, { width: width ?? "100%", height }, style]}
  />
);

export const styles = {
  skeletonBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },
};
