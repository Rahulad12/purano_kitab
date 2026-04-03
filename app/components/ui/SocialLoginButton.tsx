/**
 * Social Login Button Component - Google OAuth button
 */

import { useTheme } from "@/app/context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "@/app/style";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SocialLoginButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  provider?: "google" | "facebook" | "apple";
  label?: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
  provider = "google",
  label = "Continue with Google",
}) => {
  const { theme } = useTheme();

  const iconMap = {
    google: "google",
    facebook: "facebook",
    apple: "apple",
  };

  const getProviderColor = () => {
    switch (provider) {
      case "google":
        return "#ce8f31";
      case "facebook":
        return "#1877F2";
      case "apple":
        return theme.colors.text;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          borderColor: theme.colors.border,
        },
        (disabled || isLoading) && { opacity: 0.6 },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={getProviderColor()} size="small" />
        ) : (
          <FontAwesome
            name={iconMap[provider] as any}
            size={20}
            color={getProviderColor()}
            style={styles.icon}
          />
        )}
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.label,
  },
});

export default SocialLoginButton;
