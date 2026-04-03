import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "../style";

interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  onPress?: () => void;
}

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const menuList: MenuItem[] = [
    { title: "Home", icon: "home", link: "/protected" },
    { title: "Sell", icon: "add-circle-outline", link: "/protected/sellbooks" },
    {
      title: "My Books",
      icon: "library-books",
      link: "/protected/allListedbook/by-user",
    },
  ];

  const isActive = (link: string) => {
    return pathname === link || pathname.startsWith(link);
  };

  return (
    <View
      style={[
        styles.footer,
        {
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {menuList.map((item, index) => {
        const active = item.link ? isActive(item.link) : false;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              active && {
                borderTopWidth: 2,
                borderTopColor: theme.colors.primary,
              },
            ]}
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
              color={active ? theme.colors.primary : theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.menuText,
                {
                  color: active
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderTopWidth: 1,
  },
  menuItem: {
    alignItems: "center",
    paddingVertical: SPACING.sm,
    flex: 1,
  },
  menuText: {
    ...TYPOGRAPHY.captionSmall,
    marginTop: SPACING.xs,
  },
});
