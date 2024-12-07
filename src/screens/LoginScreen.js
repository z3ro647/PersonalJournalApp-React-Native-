import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import InputField from "../components/InputField";
import PasswordInputField from "../components/PasswordInputField";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import AuthFooter from "../components/AuthFooter";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const errorMessage = {
        "auth/invalid-email": "Invalid email address.",
        "auth/user-not-found": "No user found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
      };
      setError(errorMessage[err.code] || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <ErrorMessage message={error} />

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <PasswordInputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
      />

      {loading ? <Loader /> : <Button title="Login" onPress={handleLogin} />}

      <AuthFooter
        promptText="Don't have an account?"
        linkText="Sign up"
        onLinkPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20, textAlign: "center" },
});

export default LoginScreen;
