import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F86624",
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4a3938",
    // color: "#6B0504",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7E8287",
  },
  smallText: {
    fontSize: 12,
    color: "#eb4034",
  },
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
