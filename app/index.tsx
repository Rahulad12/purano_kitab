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
import globalStyles from "./style/global";

const App = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
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
        <Text style={globalStyles.heading}>Welcome to PuranoKitab</Text>
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
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={globalStyles.smallText}>
          © {new Date().getFullYear()} PuranoKitab
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 20,
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 20,
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
    borderBottomColor: "#e53935",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#e53935",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e53935",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
    marginTop: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    color: "#e53935",
    fontWeight: "bold",
  },
  footer: {
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default App;
