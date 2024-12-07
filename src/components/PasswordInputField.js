import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

const PasswordInputField = ({ placeholder, value, onChangeText, showPassword, toggleShowPassword }) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, styles.passwordInput]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!showPassword}
    />
    <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
      <Text style={styles.showPasswordText}>{showPassword ? "Hide" : "Show"}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { position: "relative", justifyContent: "center" },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  passwordInput: { paddingRight: 50 },
  showPasswordButton: { position: "absolute", right: 10, padding: 10 },
  showPasswordText: { color: "#007BFF", fontWeight: "bold" },
});

export default PasswordInputField;
