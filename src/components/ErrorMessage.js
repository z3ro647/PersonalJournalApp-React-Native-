import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorMessage = ({ message }) => message ? <Text style={styles.error}>{message}</Text> : null;

const styles = StyleSheet.create({
  error: { color: "red", marginBottom: 16, textAlign: "center" },
});

export default ErrorMessage;
