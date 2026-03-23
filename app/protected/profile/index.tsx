import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import { useAuth } from "@/app/context/AuthContext";
import COLORS from "@/app/style/primaryColor";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  type SettingItem = {
    icon: string;
    label: string;
    sub: string;
    route: string | null;
    danger?: boolean;
    onPress?: () => void;
  };

  const settingsItems: { group: string; items: SettingItem[] }[] = [
    {
      group: "Account",
      items: [
        {
          icon: "phone",
          label: "Change Phone Number",
          sub: user?.phoneNumber ?? "Not set",
          route: "/protected/settings/change-phone",
        },
        {
          icon: "mail",
          label: "Change Email",
          sub: user?.email ?? "Not set",
          route: "/protected/settings/change-email",
        },
        {
          icon: "lock",
          label: "Update Password",
          sub: "Change your password",
          route: "/protected/settings/change-password",
        },
      ],
    },
    {
      group: "Danger Zone",
      items: [
        {
          icon: "log-out",
          label: "Logout",
          sub: "Sign out of your account",
          route: null,
          danger: true,
          onPress: () => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel" as const,
              },
              {
                text: "Logout",
                style: "destructive" as const,
                onPress: () => {
                  logout();
                },
              },
            ]);
          },
        },
      ],
    },
  ];

  return (
    <PageScrollLayout title="My Profile" subtitle="Manage your account">
      {/* ── Profile Card ── */}
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </View>

        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Stats row */}
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

      {/* ── Settings Groups ── */}
      {settingsItems.map((group) => (
        <View key={group.group} style={styles.section}>
          <Text style={styles.sectionLabel}>{group.group}</Text>

          <View style={styles.sectionCard}>
            {group.items.map((item, index) => (
              <React.Fragment key={item.label}>
                <TouchableOpacity
                  style={styles.settingRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.route) {
                      router.push(item.route as any);
                    } else if (item.onPress) {
                      item.onPress();
                    }
                  }}
                >
                  {/* Icon */}
                  <View
                    style={[
                      styles.iconBox,
                      item.danger && styles.iconBoxDanger,
                    ]}
                  >
                    <Feather
                      name={item.icon as any}
                      size={18}
                      color={item.danger ? "#ef4444" : COLORS.primary}
                    />
                  </View>

                  {/* Text */}
                  <View style={styles.settingText}>
                    <Text
                      style={[
                        styles.settingLabel,
                        item.danger && styles.settingLabelDanger,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text style={styles.settingSub} numberOfLines={1}>
                      {item.sub}
                    </Text>
                  </View>

                  {/* Chevron */}
                  {!item.danger && (
                    <Feather name="chevron-right" size={18} color="#CBD5E1" />
                  )}
                </TouchableOpacity>

                {/* Divider between items */}
                {index < group.items.length - 1 && (
                  <View style={styles.rowDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </PageScrollLayout>
  );
};

const styles = StyleSheet.create({
  // ── Profile card ──
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.primary + "33",
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#14b464",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
    width: "100%",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  statLabel: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#F1F5F9",
  },

  // ── Sections ──
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxDanger: {
    backgroundColor: "#FEF2F2",
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  settingLabelDanger: {
    color: "#ef4444",
  },
  settingSub: {
    fontSize: 12,
    color: "#94A3B8",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#F8FAFC",
    marginLeft: 66,
  },

  // ── Footer ──
  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#CBD5E1",
    marginBottom: 32,
    marginTop: 8,
  },
});

export default Profile;
