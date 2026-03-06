import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useRegister } from "../api/hooks/authUser";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { mutateAsync: registerUser } = useRegister();

  const submitHandler = async () => {
    if (formData.password !== formData.confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      return;
    }

    try {
      const data = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      Toast.show({ type: "success", text1: "Registration successful" });
      setUser(data.user);
      setIsLoggedIn(true);
      router.push("/protected");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: `Registration failed: ${error.response?.data?.message || "Unknown error"}`,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>First Name</Text>
      <Input
        placeholder="Enter your first name"
        value={formData.firstName}
        onChangeText={(value) => setFormData({ ...formData, firstName: value })}
      />

      <Text style={styles.label}>Last Name</Text>
      <Input
        placeholder="Enter your last name"
        value={formData.lastName}
        onChangeText={(value) => setFormData({ ...formData, lastName: value })}
      />

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

      <Text style={styles.label}>Confirm Password</Text>
      <Input
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChangeText={(value) =>
          setFormData({ ...formData, confirmPassword: value })
        }
        secureTextEntry
      />

      <Button variant="primary" onPress={submitHandler}>
        <Text>Register</Text>
      </Button>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
});
