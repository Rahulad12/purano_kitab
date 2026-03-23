import COLORS from "@/app/style/primaryColor";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const Avatar = ({
  firstName,
  style,
  textStyle,
}: {
  firstName: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <View style={[styles.avatar, style]}>
      <Text style={[styles.textStyle, textStyle]}>{firstName?.charAt(0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.primary + "33",
    backgroundColor: COLORS.primary + "10",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 50,
    fontWeight: 800,
    color: COLORS.secondary,
  },
});

export default Avatar;
