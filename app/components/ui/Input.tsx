import COLORS from "@/app/style/primaryColor";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  keyboardType?: TextInputProps["keyboardType"];
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  setTogglePassword?: (value: boolean) => void;
  togglePassword?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  setSecureTextEntry,
  keyboardType = "default",
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  onFocus,
  onBlur,
  setTogglePassword,
  togglePassword,
  required = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={{ color: COLORS.error }}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {/* LEFT ICON */}
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

        {/* INPUT */}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {/* RIGHT ICON (custom OR password toggle) */}
        {togglePassword !== undefined ? (
          <TouchableOpacity
            onPress={() => setTogglePassword?.(!togglePassword)}
          >
            <Feather
              name={togglePassword ? "eye-off" : "eye"}
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <TouchableOpacity onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          )
        )}
      </View>

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 6,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },

  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.text,
  },

  iconLeft: {
    marginRight: 8,
  },

  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  inputError: {
    borderColor: COLORS.error,
  },

  error: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default Input;
