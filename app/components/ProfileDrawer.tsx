import { useAuth } from "@/app/context/AuthContext";
import COLORS from "@/app/style/primaryColor";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.85;

interface ProfileDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  danger?: boolean;
  onPress?: () => void;
};

const ProfileDrawer = ({ isVisible, onClose }: ProfileDrawerProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const slideAnim = React.useRef(new Animated.Value(width)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width - DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, fadeAnim]);

  const handleNavigate = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 300);
  };

  const handleLogout = async () => {
    onClose();
    setTimeout(async () => {
      await logout();
    }, 300);
  };

  const menuItems: MenuItem[] = [
    { icon: "user", label: "My Profile", route: "/protected/profile" },
    { icon: "book", label: "My Books", route: "/protected/allListedbook/by-user" },
    { icon: "heart", label: "Favorites", route: "/protected/allListedbook/favorite" },
    { icon: "shopping-bag", label: "Sell Books", route: "/protected/sellbooks" },
    { icon: "phone", label: "Change Phone", route: "/protected/settings/change-phone" },
    { icon: "mail", label: "Change Email", route: "/protected/settings/change-email" },
    { icon: "lock", label: "Update Password", route: "/protected/settings/change-password" },
    { icon: "log-out", label: "Logout", danger: true, onPress: handleLogout },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.avatar}
            />
            <Text style={styles.name}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Listed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Sold</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, item.danger && styles.menuItemDanger]}
                onPress={() => {
                  if (item.onPress) {
                    item.onPress();
                  } else if (item.route) {
                    handleNavigate(item.route);
                  }
                }}
              >
                <View
                  style={[
                    styles.iconContainer,
                    item.danger && styles.iconContainerDanger,
                  ]}
                >
                  <Feather
                    name={item.icon as any}
                    size={18}
                    color={item.danger ? "#ef4444" : COLORS.primary}
                  />
                </View>
                <Text
                  style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}
                >
                  {item.label}
                </Text>
                {!item.danger && (
                  <Feather name="chevron-right" size={18} color="#CBD5E1" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.version}>PuranoKitab v1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    paddingTop: 50,
  },
  closeButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: COLORS.primary + "10",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#E2E8F0",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuItemDanger: {
    borderBottomColor: "#FEE2E2",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconContainerDanger: {
    backgroundColor: "#FEF2F2",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B",
  },
  menuLabelDanger: {
    color: "#ef4444",
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  version: {
    fontSize: 12,
    color: "#94A3B8",
  },
});

export default ProfileDrawer;
