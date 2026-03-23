import PageScrollLayout from "@/app/components/ui/PageScrollLayout";
import { useAuth } from "@/app/context/AuthContext";
import COLORS from "@/app/style/primaryColor";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChangePhoneScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implement API call to update phone
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Phone number updated successfully");
      router.back();
    }, 1000);
  };

  return (
    <PageScrollLayout title="Change Phone" subtitle="Update your phone number">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color={COLORS.primary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter new phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
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

export default ChangePhoneScreen;
