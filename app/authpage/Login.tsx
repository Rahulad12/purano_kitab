import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const submitHandler = () => {
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    if (formData.email === "rahul@gmail.com" && formData.password === "123456") {
      alert('Login successful');
      setIsLoggedIn(true);
      router.push('/protected');
    } else {
      alert('Invalid email or password');
      setIsLoggedIn(false);
      setFormData({ email: '', password: '', rememberMe: false });
      return;
    }
  }

  return (
    <View style={styles.wrapper}>
      {/* Login Form */}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(value) => setFormData({ ...formData, password: value })}
        secureTextEntry
      />

      {/* Remember Me */}
      <View style={styles.rememberRow}>
        <Switch value={formData.rememberMe} onValueChange={(value) => setFormData({ ...formData, rememberMe: value })} />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#e53935',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
