import COLORS from "@/app/style/primaryColor";
import React from "react";
import {
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
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onPress,
  style,
  textStyle,
  disabled,
  ...rest
}) => {
  // Determine container styles based on variant and disabled state
  const getContainerStyle = () => {
    const baseStyle = styles.baseContainer;
    switch (variant) {
      case "primary":
        return [
          baseStyle,
          styles.primaryContainer,
          disabled && styles.disabledContainer,
        ];
      case "secondary":
        return [
          baseStyle,
          styles.secondaryContainer,
          disabled && styles.disabledContainer,
        ];
      case "ghost":
        return [
          baseStyle,
          styles.ghostContainer,
          disabled && styles.disabledGhost,
        ];
      case "link":
        return [styles.linkContainer, disabled && styles.disabledLink];
      default:
        return [baseStyle, styles.primaryContainer];
    }
  };

  // Determine text styles based on variant and disabled state
  const getTextStyle = () => {
    const baseStyle = styles.baseText;
    switch (variant) {
      case "primary":
        return [baseStyle, styles.primaryText, disabled && styles.disabledText];
      case "secondary":
        return [
          baseStyle,
          styles.secondaryText,
          disabled && styles.disabledText,
        ];
      case "ghost":
        return [
          baseStyle,
          styles.ghostText,
          disabled && styles.disabledGhostText,
        ];
      case "link":
        return [styles.linkText, disabled && styles.disabledLinkText];
      default:
        return [baseStyle, styles.primaryText];
    }
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.secondary,
  },
  ghostContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#7dc96a",
  },
  linkContainer: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  disabledContainer: {
    backgroundColor: "#A0A0A0",
  },
  disabledGhost: {
    borderColor: "#A0A0A0",
  },
  disabledLink: {
    // no background change
  },

  baseText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  ghostText: {
    color: "#dd822c",
  },
  linkText: {
    color: "#2A4BA0",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  disabledText: {
    color: "#E0E0E0",
  },
  disabledGhostText: {
    color: "#A0A0A0",
  },
  disabledLinkText: {
    color: "#A0A0A0",
    textDecorationLine: "underline",
  },
});

export default Button;
