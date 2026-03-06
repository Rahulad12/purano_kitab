import { Redirect } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "./authpage/Login";
import Register from "./authpage/Register";
import BookLoader from "./components/common/Loader";
import Button from "./components/ui/Button";
import { useAuth } from "./context/AuthContext";
import globalStyles from "./style/global";
import COLORS from "./style/primaryColor";

const App = () => {
  const { isLoggedIn, isloading } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  if (isloading) return <BookLoader />;
  if (isLoggedIn) return <Redirect href="/protected" />;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.ibb.co/fzDpYkyM/Brown-and-Beige-Modern-Aesthetic-Fashion-Store-Design-Logo.png",
          }}
          style={styles.logo}
        />
        <Text
          style={[
            globalStyles.heading,
            {
              textAlign: "center",
            },
          ]}
        >
          Welcome to PuranoKitab
        </Text>
        <Text style={globalStyles.paragraph}>
          Buy and Sell Used Books Easily
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["login", "register"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab as "login" | "register")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "login" ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {activeTab === "login" ? <Login /> : <Register />}

        {/* Login with Google */}
        {activeTab === "login" && (
          <Button variant="ghost">
            <Text style={globalStyles.paragraph}>Login with Google</Text>
          </Button>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={globalStyles.priceText}>
          © {new Date().getFullYear()} PuranoKitab
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.secondary,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  footer: {
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default App;
