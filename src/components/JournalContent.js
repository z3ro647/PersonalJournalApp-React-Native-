import React from "react";
import { Text, StyleSheet } from "react-native";

const JournalContent = ({ content }) => (
  <Text style={styles.content}>{content}</Text>
);

const styles = StyleSheet.create({
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 20,
  },
});

export default JournalContent;
