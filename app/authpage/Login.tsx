import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Toast from "react-native-toast-message";

import { useAuthUser } from "../api";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [togglePassowrd, setTogglePassowrd] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { mutateAsync: loginUser, isPending: loadingLogin } = useAuthUser();
  const submitHandler = async () => {
    try {
      await loginUser(formData);
      router.push("/protected");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: `Login failed: ${error.response?.data?.message || "Unknown error"}`,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Login Form */}

      <Text style={styles.label}>Email</Text>
      <Input
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <Input
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
        secureTextEntry
      />

      {/* Remember Me */}
      <View style={styles.rememberRow}>
        <Switch
          value={formData.rememberMe}
          onValueChange={(value) =>
            setFormData({ ...formData, rememberMe: value })
          }
        />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      {/* Login Button */}
      <Button variant="primary" onPress={submitHandler}>
        <Text>{loadingLogin ? "Logging in..." : "Login"}</Text>
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },

  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    color: "#555",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
});
