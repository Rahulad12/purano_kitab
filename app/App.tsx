import { Redirect } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useGoogleLogin } from "./api";
import BookLoader from "./components/common/Loader";
import SocialLoginButton from "./components/ui/SocialLoginButton";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isLoggedIn, isloading } = useAuth();
  const { handleGoogleLogin, isLoading: googleLoading } = useGoogleLogin();

  if (isloading) return <BookLoader />;
  if (isLoggedIn) return <Redirect href="/protected" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.ibb.co/fzDpYkyM/Brown-and-Beige-Modern-Aesthetic-Fashion-Store-Design-Logo.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.appName}>PuranoKitab</Text>
        <Text style={styles.tagline}>BUY &amp; SELL USED BOOKS</Text>
      </View>

      <View style={styles.divider} />

      {/* Welcome */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome back</Text>
        <Text style={styles.welcomeSub}>Sign in to continue your journey</Text>
      </View>

      {/* Google Login Button */}
      <SocialLoginButton
        provider="google"
        label="Continue with Google"
        onPress={handleGoogleLogin}
        isLoading={googleLoading}
        disabled={googleLoading}
      />

      {/* Footer */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} PuranoKitab
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6ec",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  appName: {
    fontFamily: "Georgia",
    fontSize: 28,
    fontWeight: "bold",
    color: "#3d2008",
    letterSpacing: 0.5,
  },
  tagline: {
    fontFamily: "Georgia",
    fontSize: 12,
    color: "#9c6b3c",
    letterSpacing: 2,
    marginTop: 4,
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: "#c8864a",
    opacity: 0.4,
    marginVertical: 28,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  welcomeTitle: {
    fontFamily: "Georgia",
    fontSize: 22,
    color: "#3d2008",
    marginBottom: 6,
  },
  welcomeSub: {
    fontFamily: "Georgia",
    fontSize: 13,
    color: "#9c6b3c",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: "#b8855a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e8d5be",
    gap: 12,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    fontFamily: "Georgia",
    fontSize: 15,
    fontWeight: "bold",
    color: "#3d2008",
  },
  footer: {
    marginTop: "auto",
    paddingTop: 40,
    fontFamily: "Georgia",
    fontSize: 11,
    color: "#b8925a",
  },
});

export default App;
