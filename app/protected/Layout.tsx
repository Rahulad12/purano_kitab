// app/Layout.tsx (or wherever it's saved)
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileDrawer from "../components/ProfileDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isProfileDrawerVisible, setIsProfileDrawerVisible] = useState(false);

  const openProfileDrawer = () => {
    setIsProfileDrawerVisible(true);
  };

  const closeProfileDrawer = () => {
    setIsProfileDrawerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onProfilePress={openProfileDrawer} />
      <View style={{ flex: 1 }}>{children}</View>
      <Footer />
      <ProfileDrawer
        isVisible={isProfileDrawerVisible}
        onClose={closeProfileDrawer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Layout;
