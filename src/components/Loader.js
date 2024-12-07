import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loader = ({ size = "large", color = "#007BFF" }) => (
  <ActivityIndicator size={size} color={color} style={styles.loader} />
);

const styles = StyleSheet.create({
  loader: { marginVertical: 20 },
});

export default Loader;
