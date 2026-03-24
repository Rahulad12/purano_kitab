import { useChangeEmailOrPhone } from "@/app/api/hooks/user";
import Input from "@/app/components/ui/Input";
import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import { usePuranoContext } from "@/app/context/use-context/use-purano-context";
import COLORS from "@/app/style/primaryColor";
import { ChangeEmailOrPhoneDto } from "@/app/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChangeEmailScreen = () => {
  const { user } = usePuranoContext();
  const router = useRouter();
  const [formData, setFormData] = useState<ChangeEmailOrPhoneDto>({
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    password: "",
  });
  const { mutateAsync: changeEmailOrPhone, isPending: emailOrPhoneChanging } =
    useChangeEmailOrPhone();

  const handleSave = async () => {
    await changeEmailOrPhone(formData);
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
          placeholder="Enter new phone number"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={formData.phone}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, phone: text }))
          }
          leftIcon={<Feather name="phone" size={20} color={COLORS.primary} />}
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
          style={[styles.button, emailOrPhoneChanging && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={emailOrPhoneChanging}
        >
          {emailOrPhoneChanging ? (
            <Text style={styles.buttonText}>Saving...</Text>
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
