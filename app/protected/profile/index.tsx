import PageLayout from "@/app/components/ui/PageLayout";
import { useAuth } from "@/app/context/AuthContext";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const { user } = useAuth();

  return (
    <PageLayout title="My Profile" subtitle="Manage your account">
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 80,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

export default Profile;
