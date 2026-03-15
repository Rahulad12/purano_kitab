import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import COLORS from "../style/primaryColor";

interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  onPress?: () => void;
}

const Footer = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const menuList: MenuItem[] = [
    { title: "Home", icon: "home", link: "/protected" },
    { title: "Sell", icon: "add", link: "/protected/sellbooks" },
    { title: "Chat", icon: "chat-bubble-outline", link: "/chat" },
    { title: "Profile", icon: "person-outline", link: "/protected/profile" },
    { title: "Books", icon: "book", link: "/protected/allListedbook/by-user" },
    { title: "Logout", icon: "logout", onPress: handleLogout },
  ];

  return (
    <View style={styles.footer}>
      {menuList.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => {
            if (item.onPress) {
              item.onPress();
            } else if (item.link) {
              router.push(item.link as any);
            }
          }}
        >
          <MaterialIcons
            name={item.icon as any}
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.lightText,
  },
});
