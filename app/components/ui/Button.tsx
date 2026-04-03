import { useTheme } from "@/app/context/ThemeContext";
import { SPACING } from "@/app/style";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onPress,
  style,
  textStyle,
  disabled,
  isLoading = false,
  ...rest
}) => {
  const { theme } = useTheme();

  const getContainerStyle = () => {
    const sizeStyles = {
      sm: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
      md: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg },
      lg: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl },
    };

    const baseStyle = [
      styles.baseContainer,
      sizeStyles[size],
      { borderRadius: theme.radius.md },
    ];

    const variantStyle = {
      primary: { backgroundColor: theme.colors.primary },
      secondary: { backgroundColor: theme.colors.secondary },
      ghost: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      link: { backgroundColor: "transparent" },
    };

    const disabledStyle = disabled
      ? { backgroundColor: theme.colors.disabled }
      : {};

    return [baseStyle, variantStyle[variant], disabledStyle];
  };

  const getTextStyle = () => {
    const textColor = {
      primary: disabled ? theme.colors.disabledText : "#FFFFFF",
      secondary: disabled ? theme.colors.disabledText : "#FFFFFF",
      ghost: disabled ? theme.colors.disabledText : theme.colors.primary,
      link: disabled ? theme.colors.disabledText : theme.colors.primary,
    };

    return [styles.baseText, { color: textColor[variant] }, textStyle];
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={(getTextStyle()[1] as { color: string }).color}
        />
      ) : (
        <Text style={getTextStyle()}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Button;
