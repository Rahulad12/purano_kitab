import { StyleSheet } from "react-native";
import COLORS from "./primaryColor";

const globalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.secondary,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.lightText,
  },
  priceText: { fontSize: 14, fontWeight: "700", color: COLORS.price },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#faf5f5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  scrollView: {},
});

export default globalStyles;
