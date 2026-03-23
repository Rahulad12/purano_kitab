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
import Toast from "react-native-toast-message";

import { useAuthUser } from "../api";
import Button from "../components/ui/Button";
import PageLayout from "../components/ui/PageLayout";
import { useAuth } from "../context/AuthContext";
import COLORS from "../style/primaryColor";

const Login = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: loginUser, isPending: loadingLogin } = useAuthUser();

  const update = (field: string) => (value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const submitHandler = async () => {
    if (!formData.email || !formData.password) {
      Toast.show({
        type: "error",
        text1: "Please fill all fields",
      });
      return;
    }

    try {
      await loginUser(formData);
      router.push("/protected");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.response?.data?.message || "Unknown error",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PageLayout>
        <View style={styles.container}>
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color={COLORS.primary}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="jane@example.com"
                value={formData.email}
                onChangeText={update("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={20}
                color={COLORS.primary}
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={update("password")}
                secureTextEntry={!showPassword}
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me */}
          <View style={styles.rememberRow}>
            <View style={styles.rememberLeft}>
              <Switch
                value={formData.rememberMe}
                onValueChange={(value) => update("rememberMe")(value)}
                trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
                thumbColor={formData.rememberMe ? COLORS.secondary : "#94A3B8"}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>
          </View>
        </View>

        {/* Submit */}
        <Button
          variant="primary"
          onPress={submitHandler}
          disabled={loadingLogin}
        >
          <Text style={styles.submitText}>
            {loadingLogin ? "Signing in…" : "Sign In"}
          </Text>
        </Button>
      </PageLayout>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    gap: 16,
  },
  inputWrapper: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 12,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    padding: 0,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rememberLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rememberText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  submitText: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
});
