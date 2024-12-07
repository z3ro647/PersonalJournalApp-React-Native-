import React from "react";
import { Text, StyleSheet } from "react-native";

const AuthFooter = ({ promptText, linkText, onLinkPress }) => (
  <Text style={styles.footer}>
    {promptText}{" "}
    <Text style={styles.link} onPress={onLinkPress}>
      {linkText}
    </Text>
  </Text>
);

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  link: { color: "#007BFF", fontWeight: "bold" },
});

export default AuthFooter;
