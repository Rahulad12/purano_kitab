import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { useRegister } from "../api/hooks/authUser";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PageScrollLayout from "../components/ui/PageScrollLayout";
import { useAuth } from "../context/AuthContext";
import COLORS from "../style/primaryColor";

const Register = () => {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const { mutateAsync: registerUser, isPending } = useRegister();

  const update = (field: string) => (value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const submitHandler = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      Toast.show({
        type: "error",
        text1: "Please fill all required fields",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      return;
    }

    if (formData.password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password must be at least 6 characters",
      });
      return;
    }

    try {
      const data = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
      Toast.show({ type: "success", text1: "Registration successful" });
      setUser(data.user);
      setIsLoggedIn(true);
      router.push("/protected");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error.response?.data?.message || "Unknown error",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PageScrollLayout>
        <View style={styles.container}>
          {/* Name row */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Input
                labelStyle={styles.label}
                label="First Name"
                placeholder="Jane"
                value={formData.firstName}
                onChangeText={update("firstName")}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.halfField}>
              <Input
                labelStyle={styles.label}
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={update("lastName")}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Email */}
          <Input
            labelStyle={styles.label}
            label="Email Address"
            placeholder="jane@example.com"
            value={formData.email}
            onChangeText={update("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Phone */}
          <Input
            labelStyle={styles.label}
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={formData.phoneNumber}
            onChangeText={update("phoneNumber")}
            keyboardType="phone-pad"
          />

          <View style={styles.divider} />

          {/* Password */}
          <Input
            labelStyle={styles.label}
            label="Password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChangeText={update("password")}
            secureTextEntry={showPassword}
          />

          {/* Confirm Password */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              labelStyle={styles.label}
              label="Confirm Password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChangeText={update("confirmPassword")}
              secureTextEntry={!showConfirmPassword}
              setSecureTextEntry={setShowConfirmPassword}
            />
          </View>

          <View style={styles.divider} />

          {/* Submit */}
          <Button
            variant="primary"
            onPress={submitHandler}
            disabled={isPending}
          >
            <Text>{isPending ? "Creating account…" : "Create Account"}</Text>
          </Button>
        </View>
      </PageScrollLayout>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  fieldGap: {
    marginTop: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.lightText,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
