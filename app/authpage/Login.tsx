import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuthUser, useGoogleLogin } from "../api";
import Button from "../components/ui/Button";
import PageLayout from "../components/ui/PageLayout";
import SocialLoginButton from "../components/ui/SocialLoginButton";
import { showError, showSuccess } from "../components/ui/Toast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "../style";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutateAsync: loginUser, isPending: loadingLogin } = useAuthUser();
  const { handleGoogleLogin, isLoading: googleLoading } = useGoogleLogin();

  const update = (field: string) => (value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await loginUser(formData);
      showSuccess("Welcome back!");
      router.push("/protected");
    } catch (error: any) {
      showError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PageLayout>
        <View style={[styles.container, { paddingHorizontal: SPACING.md }]}>
          {/* Email Input */}
          <View>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Email
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.colors.backgroundSecondary,
                  borderColor: errors.email
                    ? theme.colors.error
                    : theme.colors.border,
                },
              ]}
            >
              <Feather
                name="mail"
                size={20}
                color={theme.colors.primary}
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="jane@example.com"
                placeholderTextColor={theme.colors.placeholder}
                value={formData.email}
                onChangeText={update("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Password
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.colors.backgroundSecondary,
                  borderColor: errors.password
                    ? theme.colors.error
                    : theme.colors.border,
                },
              ]}
            >
              <Feather
                name="lock"
                size={20}
                color={theme.colors.primary}
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { color: theme.colors.text }]}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.placeholder}
                value={formData.password}
                onChangeText={update("password")}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.password}
              </Text>
            )}
          </View>

          {/* Remember Me */}
          <View style={styles.rememberRow}>
            <View style={styles.rememberLeft}>
              <Switch
                value={formData.rememberMe}
                onValueChange={(value) => update("rememberMe")(value)}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={theme.colors.background}
              />
              <Text style={[styles.rememberText, { color: theme.colors.text }]}>
                Remember me
              </Text>
            </View>
          </View>
        </View>

        {/* Submit */}
        <Button
          variant="primary"
          onPress={submitHandler}
          disabled={loadingLogin}
          isLoading={loadingLogin}
        >
          Sign In
        </Button>

        {/* Divider */}
        <View
          style={[
            styles.dividerContainer,
            { borderTopColor: theme.colors.border },
          ]}
        >
          <Text
            style={[styles.dividerText, { color: theme.colors.textSecondary }]}
          >
            Or continue with
          </Text>
        </View>

        {/* Social Login */}
        <SocialLoginButton
          provider="google"
          label="Continue with Google"
          onPress={handleGoogleLogin}
          isLoading={googleLoading}
          disabled={loadingLogin}
        />
      </PageLayout>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    gap: SPACING.md,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.bodyMedium,
    padding: 0,
  },
  errorText: {
    ...TYPOGRAPHY.captionSmall,
    marginTop: SPACING.xs,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },
  rememberLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  rememberText: {
    ...TYPOGRAPHY.label,
  },
  dividerContainer: {
    borderTopWidth: 1,
    paddingVertical: SPACING.lg,
    alignItems: "center",
    marginVertical: SPACING.sm,
  },
  dividerText: {
    ...TYPOGRAPHY.bodySmall,
  },
});
