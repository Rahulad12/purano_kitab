import { useChangeEmail } from "@/app/api/hooks/user";
import Input from "@/app/components/ui/Input";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import { useAuth } from "@/app/context/AuthContext";
import COLORS from "@/app/style/primaryColor";
import { ChangeEmailDto } from "@/app/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ChangeEmailScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<ChangeEmailDto>({
    email: "",
    password: "",
  });
  const { mutateAsync: changeEmail, isPending: emailChanging } =
    useChangeEmail();

  const handleSave = async () => {
    await changeEmail(formData);
    router.back();
  };

  return (
    <PageScrollLayout title="Change Email" subtitle="Update your email address">
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder="Enter new email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          leftIcon={<Feather name="mail" size={20} color={COLORS.primary} />}
        />

        <Input
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          leftIcon={<Feather name="lock" size={20} color={COLORS.primary} />}
        />

        <TouchableOpacity
          style={[styles.button, emailChanging && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={emailChanging}
        >
          {emailChanging ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </PageScrollLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChangeEmailScreen;
